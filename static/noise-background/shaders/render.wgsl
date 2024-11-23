@group(0) @binding(0) var<storage, read_write> colors: array<vec3f>;
@group(0) @binding(1) var<uniform> chaos: f32;
@group(0) @binding(2) var<uniform> grain: f32;
@group(0) @binding(3) var<uniform> temperature: f32;
@group(0) @binding(4) var<uniform> z: f32;

fn random(st: vec2<f32>) -> f32 {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv: vec2<f32>,
}

@vertex
fn vs(@location(0) position: vec2f) -> VertexOutput {
    return VertexOutput(vec4(position, 0.0, 1.0), position * 0.5 + 0.5);
}

fn colormix(a: vec3f, b: vec3f, weight: f32) -> vec3f {
    return sqrt(mix(a * a, b * b, weight));
}

fn softmax(xs: array<f32, 16>, n: u32, T: f32) -> array<f32, 16> {
    var ys: array<f32, 16>;
    var sum = 0.0;
    var maxX = 0.0;
    for (var i = 0u; i < n; i++) {
        if (xs[i] > maxX) {
            maxX = xs[i];
        }
    }
    for (var i = 0u; i < n; i++) {
        ys[i] = exp((xs[i] - maxX) / T);
        sum += ys[i];
    }
    for (var i = 0u; i < n; i++) {
        ys[i] /= sum;
    }
    return ys;
}

@fragment
fn fs(fs_in: VertexOutput) -> @location(0) vec4<f32> {
    const PI = 3.1415926535897932384626433832795;
    let n = arrayLength(&colors);
    var weights: array<f32, 16>;

    var totalWeight = 0.0;
    for (var i = 0u; i < n; i++) {
        var weight = atan(snoise(vec3f(fs_in.uv + f32(i), z)));
        weight = weight / PI * 2 + 0.5;
        weight += random(fs_in.uv + f32(i)) * chaos;
        totalWeight += weight;
        weights[i] = weight;
    }
    for (var i = 0u; i < n; i++) {
        if (totalWeight == 0.0) {
            weights[i] = 1.0 / f32(n);
        } else {
            weights[i] = weights[i] / totalWeight;
        }
    }
    weights = softmax(weights, n, temperature);
    var color = vec3f(0.0, 0.0, 0.0);
    for (var i = 0u; i < n; i++) {
        var weight = weights[i];
        color += colors[i] * colors[i] * weight;
    }
    color = sqrt(color);
    color += (random(fs_in.uv + 1.0) - 0.5) * grain;
    return vec4(color, 1.0);
}
