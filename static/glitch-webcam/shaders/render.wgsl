@group(0) @binding(0) var sample: sampler;
@group(0) @binding(1) var texture: texture_external;
@group(0) @binding(2) var<uniform> time: f32;
@group(0) @binding(3) var<uniform> decibels: vec4u;

fn mod289(x: vec4f) -> vec4f {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

fn permute(x: vec4f) -> vec4f {
    return mod289(((x * 34.0) + 10.0) * x);
}

fn taylorInvSqrt(r: vec4f) -> vec4f {
    return 1.79284291400159 - 0.85373472095314 * r;
}

fn snoise(v: vec3f) -> f32 {
    let C = vec2f(1.0 / 6.0, 1.0 / 3.0);
    let D = vec4f(0.0, 0.5, 1.0, 2.0);

    // First corner
    var i = floor(v + dot(v, C.yyy));
    let x0 = v - i + dot(i, C.xxx);

    // Other corners
    let g = step(x0.yzx, x0.xyz);
    let l = 1.0 - g;
    let i1 = min(g.xyz, l.zxy);
    let i2 = max(g.xyz, l.zxy);

    //   x0 = x0 - 0.0 + 0.0 * C.xxx;
    //   x1 = x0 - i1  + 1.0 * C.xxx;
    //   x2 = x0 - i2  + 2.0 * C.xxx;
    //   x3 = x0 - 1.0 + 3.0 * C.xxx;
    let x1 = x0 - i1 + C.xxx;
    let x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
    let x3 = x0 - D.yyy; // -1.0+3.0*C.x = -0.5 = -D.y

    // Permutations
    i = mod289(vec4f(i, 0)).xyz;
    let p = permute(permute(permute(i.z + vec4f(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4f(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4f(0.0, i1.x, i2.x, 1.0));

    // Gradients: 7x7 points over a square, mapped onto an octahedron.
    // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
    let n_ = 0.142857142857; // 1.0/7.0
    let ns = n_ * D.wyz - D.xzx;

    let j = p - 49.0 * floor(p * ns.z * ns.z); //  mod(p,7*7)

    let x_ = floor(j * ns.z);
    let y_ = floor(j - 7.0 * x_); // mod(j,N)

    let x = x_ * ns.x + vec4f(ns.y);
    let y = y_ * ns.x + vec4f(ns.y);
    let h = 1.0 - abs(x) - abs(y);

    let b0 = vec4f(x.xy, y.xy);
    let b1 = vec4f(x.zw, y.zw);

    //vec4f s0 = vec4f(lessThan(b0,0.0))*2.0 - 1.0;
    //vec4f s1 = vec4f(lessThan(b1,0.0))*2.0 - 1.0;
    let s0 = floor(b0) * 2.0 + 1.0;
    let s1 = floor(b1) * 2.0 + 1.0;
    let sh = -step(h, vec4f(0.0));

    let a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    let a1 = b1.xzyw + s1.xzyw * sh.zzww;

    var p0 = vec3f(a0.xy, h.x);
    var p1 = vec3f(a0.zw, h.y);
    var p2 = vec3f(a1.xy, h.z);
    var p3 = vec3f(a1.zw, h.w);

    //Normalise gradients
    let norm = taylorInvSqrt(vec4f(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    var m = 0.5 - vec4f(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3));
    m = max(m, vec4f(0.0));
    m = m * m;
    return 105.0 * dot(m * m, vec4f(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

fn rand(uv: vec2<f32>) -> f32 {
    return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
}

fn fbm(v: vec3f, H: f32) -> f32 {
    let G = exp2(-H);
    var f = 1.0;
    var a = 1.0;
    var t = 0.0;
    for (var i = 0; i < 8; i++) {
        t += a * snoise(f * v);
        f *= 2.0;
        a *= G;
    }
    return t;
}

struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv: vec2<f32>,
}

@vertex
fn vs(@location(0) position: vec2f) -> VertexOutput {
    let uv = (position * vec2f(1, -1)) * 0.5 + 0.5;
    let vs_out = VertexOutput(vec4<f32>(position, 0.0, 1.0), uv);
    return vs_out;
}

@fragment
fn fs(fs_in: VertexOutput) -> @location(0) vec4<f32> {
    const strength = 0.1;
    const gamma = 2.0;
    const border_radius = 0.2;
    const size = 1.0;
    const noise_reduction = 0.2;
    const noise_factor = 2.0;
    const noise_density = 4.0;
    const minimum_noise = 0.005;

    var uv = (fs_in.uv - 0.5) * 2.0;
    uv += uv * pow(dot(uv, uv), gamma) * strength;
    uv /= 1 + strength;

    let border_distance = length(saturate(abs(uv) - 1.0 + border_radius));
    let border = saturate(1.0 - (border_distance - border_radius) / border_radius / (sqrt(2.0) - 1.0));

    uv = (uv + 1.0) * 0.5;
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
        discard;
    }

    var noise = 0.0;
    for (var i = 0u; i < 4u; i++) {
        noise += f32((decibels[i] >> 0u) % 256) / 255.0;
        noise += f32((decibels[i] >> 4u) % 256) / 255.0;
        noise += f32((decibels[i] >> 8u) % 256) / 255.0;
        noise += f32((decibels[i] >> 12u) % 256) / 255.0;
    }
    noise /= 16.0;
    noise = saturate(noise - noise_reduction);
    noise += minimum_noise;

    noise *= fbm(vec3(0.0, 0.0, -time + uv.y * noise_density), 1.0) * noise_factor;
    var pixel = textureSampleBaseClampToEdge(texture, sample, uv + vec2f(noise, 0.0));

    var color = vec3(0.0);
    if (fs_in.position.x / size % 3 < 1) {
        color.r = pixel.r;
    } else if (fs_in.position.x / size % 3 < 2) {
        color.g = pixel.g;
    } else {
        color.b = pixel.b;
    }
    var color_filter = vec3(0.8, 1.0, 0.8);
    color_filter = normalize(color_filter) * 2.0;
    color *= color_filter;
    if (fs_in.position.y / size % 6 < 1) {
        color *= 0.8;
    }
    color *= border * border;
    return vec4(color, 1.0);
}
