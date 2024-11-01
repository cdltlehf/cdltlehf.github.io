@group(0) @binding(0) var<uniform> res: vec2u;
@group(0) @binding(1) var<uniform> grid_res: vec2u;
@group(0) @binding(4) var<storage, read> img: array<u32>;
@group(0) @binding(5) var<storage, read_write> grid: array<f32>;
@group(0) @binding(6) var<storage, read_write> velocity: array<f32>;
@group(0) @binding(7) var<storage, read> prev_img: array<u32>;
@group(0) @binding(8) var<storage, read> prev_grid: array<f32>;

fn pixel(frame: ptr<storage, array<u32>>, uv: vec2f) -> vec4f {
    let res = vec2u(res);
    var xy = vec2u(uv * vec2f(res));

    let i = xy.x + xy.y * res.x;
    return u32ToVec4f((*frame)[i]);
}

fn gaussian(
    frame: ptr<storage, array<u32>, read>,
    uv: vec2f,
    directions: f32,
    quality: f32,
    size: f32,
) -> vec4f {
    const PI = 3.14159265358979323846;
    const TAU = PI * 2.0;

    var radius = vec2f(size) / vec2f(res);

    var sum = 0.0;
    var color = pixel(frame, uv);
    for (var d = 0.0; d < TAU; d += TAU / directions) {
        for (var i = 1.0 / quality; i <= 1.0; i += 1.0 / quality) {
            let duv = vec2f(cos(d), sin(d)) * radius * i;
            color += pixel(frame, saturate(uv + duv));
        }
    }
    color /= directions * quality;
    return color;
}

fn u32ToVec4f(color: u32) -> vec4f {
    let r = f32((color >> 0u) & 0xFF);
    let g = f32((color >> 8u) & 0xFF);
    let b = f32((color >> 16u) & 0xFF);
    let a = f32((color >> 24u) & 0xFF);
    return vec4f(r, g, b, a) / 255.0;
}

@compute @workgroup_size(1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let i = id.x + grid_res.x * id.y;
    grid[i] = 0;

    let uv = vec2f(id.xy) / vec2f(grid_res);

    let directions = 4.0;
    let quality = 4.0;
    let size = 0.01 * f32(res.x);

    let color = gaussian(&img, uv, directions, quality, size);
    let prev_color = gaussian(&prev_img, uv, directions, quality, size);

    var F = vec3f(0.0);
    let F_factor = 0.01;
    const threshold = 0.2;
    if (prev_color.w > 0.0 && color.w > 0.0) {
        let diff = length(color - prev_color);
        F += saturate(diff - threshold) * F_factor;
    }

    let T = 100.0;
    let rx = 5;
    let ry = 5;
    let n = (2 * rx + 1) * (2 * ry + 1) - 1;
    for (var dx = -rx; dx <= rx; dx++) {
        for (var dy = -ry; dy <= ry; dy++) {
            if (dx == 0 && dy == 0) { continue; }
            let nx = i32(id.x) + dx;
            let ny = i32(id.y) + dy;
            let interior = (0 <= nx && nx < i32(grid_res.x) && 0 <= ny && ny < i32(grid_res.y));
            let ni = u32(nx) + u32(ny) * grid_res.x;

            let f1 = prev_grid[i];
            let f2 = select(f1, prev_grid[ni], interior);
            let df = f2 - f1;
            let aspect = f32(grid_res.x) / f32(grid_res.y);
            let ds = vec2f(f32(dx), f32(dy) * aspect);
            F += T * normalize(vec3f(ds, df)) / f32(n);
        }
    }

    const alpha = 0.9;

    const dt = 1.0 / 30.0;
    const m = 0.01;
    velocity[i] += F.z / m * dt;
    grid[i] += prev_grid[i] + velocity[i] * dt;
    grid[i] *= alpha;

    /* let R = 0.5; */
    /* let r = length((uv - vec2f(0.5)) * vec2f(res) / f32(res.x)); */
    /* grid[i] = select(0.0, sqrt(R * R - r * r), r < R); */
} /* vim: set et ts=4 sw=4: */
