@group(0) @binding(0) var<uniform> res: vec2u;
@group(0) @binding(1) var<uniform> grid_res: vec2u;
@group(0) @binding(4) var<storage, read> img: array<u32>;
@group(0) @binding(5) var<storage, read> vs: array<f32>;
@group(0) @binding(6) var<storage, read> prev_img: array<u32>;

fn pixel(frame: ptr<storage, array<u32>>, uv: vec2f) -> vec4f {
    let res = vec2u(res);
    var xy = vec2u(uv * vec2f(res));

    let i = xy.x + xy.y * res.x;
    return u32ToVec4f((*frame)[i]);
}

fn u32ToVec4f(color: u32) -> vec4f {
    let r = f32((color >> 0u) & 0xFF);
    let g = f32((color >> 8u) & 0xFF);
    let b = f32((color >> 16u) & 0xFF);
    let a = f32((color >> 24u) & 0xFF);
    return vec4f(r, g, b, a) / 255.0;
}

fn slerp(n1: vec3f, n2: vec3f, t: f32) -> vec3f {
    const EPSILON = 0.00001;
    let c = clamp(dot(normalize(n1), normalize(n2)), -1 + EPSILON, 1 - EPSILON);
    let theta = acos(c);
    let s = sqrt(1 - c * c);

    let w1 = sin((1.0 - t) * theta) / s;
    let w2 = sin(t * theta) / s;

    return n1 * w1 + n2 * w2;
}

fn getNormal(uv: vec2f) -> vec3f {
    let id = uv * vec2f(grid_res);

    let t = vec2i(floor(id));
    let tt = vec2f(fract(id));

    var fs = array<f32, 16>();
    for (var i = -1; i <= 2; i++) {
        for (var j = -1; j <= 2; j++) {
            let nx = clamp(i + t.x, 0, i32(grid_res.x) - 1);
            let ny = clamp(j + t.y, 0, i32(grid_res.y) - 1);
            let f = vs[nx + i32(grid_res.x) * ny];
            fs[(i + 1) + 4 * (j + 1)] = f;
        }
    }
    /* fs */
    /* xx 01 02 xx */
    /* 04 05 06 07 */
    /* 08 09 10 11 */
    /* xx 13 14 xx */
    let df00 = vec2f(fs[ 6] - fs[ 4], fs[ 9] - fs[ 1]);
    let df01 = vec2f(fs[ 7] - fs[ 5], fs[10] - fs[ 2]);
    let df10 = vec2f(fs[10] - fs[ 8], fs[13] - fs[ 5]);
    let df11 = vec2f(fs[11] - fs[ 9], fs[14] - fs[ 6]);

    let n00 = normalize(vec3f(-vec2f(df00), 1.0));
    let n01 = normalize(vec3f(-vec2f(df01), 1.0));
    let n10 = normalize(vec3f(-vec2f(df10), 1.0));
    let n11 = normalize(vec3f(-vec2f(df11), 1.0));

    let n0 = slerp(n00, n01, tt.x);
    let n1 = slerp(n10, n11, tt.x);

    var n = slerp(n0, n1, tt.y);
    n = normalize(n * vec3f(vec2f(grid_res), 1.0));
    return n;
}

fn getReflectedPixel(uv: vec2f, N: vec3f, d: f32) -> vec4f {
    let R = reflect(vec3f(0, 0, -1), N);
    let xyRz = d * R.xy / vec2f(res) * f32(res.x) + uv * R.z;
    if (xyRz.x < 0.0 || xyRz.x >= R.z || xyRz.y < 0.0 || xyRz.y >= R.z) {
        return vec4f(0.0);
    }
    return pixel(&img, saturate(xyRz / R.z));
}

@fragment
fn main(@builtin(position) in: vec4f) -> @location(0) vec4f {
    let uv = vec2f(in.xy) / vec2f(res);

    const d = 0.5;
    let N = getNormal(uv);

    let pixel = getReflectedPixel(uv, N, d).xyz;

    let ambientColor = pixel;
    let diffuseColor = vec3f(0.0, 0.0, 1.0);
    let specularColor = vec3f(1.0);

    let L = normalize(vec3f(0.1, 0.1, -1.0));
    let lambertian = max(dot(N, -L), 0.0);

    var specular = 0.0;
    const shininessVal = 512.0;

    const Ka = 1.0;
    const Kd = 0.0;
    const Ks = 1.0;

    if (lambertian > 0.0) {
        let R = reflect(-L, N);
        let V = normalize(-vec3f(0, 0, 1));
        let specAngle = max(dot(R, V), 0.0);
        specular = pow(specAngle, shininessVal);
    }

    let gl_FragColor = vec4(Ka * ambientColor
        + Kd * lambertian * diffuseColor
        + Ks * specular * specularColor, 1.0);
    return gl_FragColor;

} /* vim: set et ts=4 sw=4: */
