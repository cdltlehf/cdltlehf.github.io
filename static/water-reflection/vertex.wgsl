@vertex
fn main(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
    let pos = array(vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, -1.0));
    return vec4f(pos[i], 0.0, 1.0);
}
