/// <reference types='npm:@webgpu/types' />
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var hexToRgb = function(hex) {
    if (!hex.match(/#[0-9a-fA-F]{6}/)) {
        throw new Error("Invalid hex string");
    }
    var hexValue = hex.replace("#", "");
    return [
        parseInt(hexValue.substring(0, 2), 16) / 255,
        parseInt(hexValue.substring(2, 4), 16) / 255,
        parseInt(hexValue.substring(4, 6), 16) / 255
    ];
};
var float32ToUint32 = function(f) {
    return new Uint32Array(new Float32Array([
        f
    ]).buffer)[0];
};
var uint32ToFloat32 = function(u) {
    return new Float32Array(new Uint32Array([
        u
    ]).buffer)[0];
};
var getSeed = function() {
    var seedDouble = Math.floor(Math.random() * 4096);
    var seed = float32ToUint32(seedDouble);
    return seed;
};
var defaultParams = {
    width: screen.width * devicePixelRatio,
    height: screen.height * devicePixelRatio,
    colors: [
        "#ff0000",
        "#00ff00",
        "#0000ff"
    ],
    chaos: 0.1,
    grain: 0.1,
    "log-temperature": -1,
    speed: 0,
    seed: getSeed()
};
var parseParams = function(searchParams) {
    var params = _object_spread({}, defaultParams);
    if (searchParams.has("width")) {
        params.width = parseInt(searchParams.get("width"));
    }
    if (searchParams.has("height")) {
        params.height = parseInt(searchParams.get("height"));
    }
    if (searchParams.has("colors")) {
        params.colors = searchParams.get("colors").split(" ");
    }
    if (searchParams.has("chaos")) {
        params.chaos = parseFloat(searchParams.get("chaos"));
    }
    if (searchParams.has("grain")) {
        params.grain = parseFloat(searchParams.get("grain"));
    }
    if (searchParams.has("log-temperature")) {
        params["log-temperature"] = parseFloat(searchParams.get("log-temperature"));
    }
    if (searchParams.has("seed")) {
        params.seed = parseInt(searchParams.get("seed"));
    }
    if (searchParams.has("speed")) {
        params.seed = parseFloat(searchParams.get("speed"));
    }
    return params;
};
var _getBindedInput = function(target, key, type, value) {
    var parse = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : function(s) {
        return s;
    };
    var input = document.createElement("input");
    input.type = type;
    input.name = key.toString();
    input.setAttribute("value", value);
    input.value = value;
    input.oninput = function(_) {
        Object.assign(target, _define_property({}, key, parse(input.value)));
        input.setAttribute("value", input.value);
    };
    return input;
};
var getBindedRangeInput = function(target, key, value, range) {
    var input = _getBindedInput(target, key, "range", value.toString(), parseFloat);
    input.min = range[0].toString();
    input.max = range[1].toString();
    if (range.length === 3) input.step = range[2].toString();
    input.value = value.toString();
    return input;
};
var getBindedNumberInput = function(target, key, value) {
    var input = _getBindedInput(target, key, "number", value.toString(), parseFloat);
    return input;
};
var getBindedColorInput = function(target, key, value) {
    return _getBindedInput(target, key, "color", value);
};
var getBindedTextInput = function(target, key, value) {
    return _getBindedInput(target, key, "text", value);
};
var getBindedInput = function(target, property) {
    var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, range = _ref.range, defaultValue = _ref.defaultValue, label = _ref.label;
    var div = document.createElement("div");
    var labelElement = document.createElement("label");
    label = (label || property).toString();
    labelElement.innerHTML = label;
    div.appendChild(labelElement);
    var value = defaultValue || target[property];
    if (Array.isArray(value)) {
        var form = document.createElement("form");
        form.name = property.toString();
        var ol = document.createElement("ol");
        ol.start = 0;
        var getChildElement = function(target, index, value) {
            var li = document.createElement("li");
            // TODO: Support other types
            if (!(typeof value === "string")) {
                throw new Error("Unsupported type");
            }
            var input = getBindedColorInput(target, index, value);
            input.name = "".concat(property, "[").concat(index, "]");
            var removeButton = document.createElement("button");
            removeButton.innerText = "×";
            removeButton.onclick = function(e) {
                e.preventDefault();
                target.splice(index, 1);
                li.remove();
                form.dispatchEvent(new Event("change"));
            };
            li.appendChild(input);
            li.appendChild(removeButton);
            return li;
        };
        value.forEach(function(e, i) {
            var li = getChildElement(value, i, e);
            ol.appendChild(li);
        });
        var addButton = document.createElement("button");
        addButton.innerText = "+";
        addButton.onclick = function(e) {
            e.preventDefault();
            // TODO
            var childDefaultValue = "#000000";
            value.push(childDefaultValue);
            var li = getChildElement(value, value.length - 1, childDefaultValue);
            ol.appendChild(li);
            form.dispatchEvent(new Event("change"));
        };
        form.appendChild(ol);
        form.appendChild(addButton);
        div.appendChild(form);
    } else {
        var input;
        if (typeof value === "string") {
            input = value.match(/#[0-9a-fA-F]{6}/) ? getBindedColorInput(target, property, value) : getBindedTextInput(target, property, value);
        } else if (typeof value === "number") {
            input = range ? getBindedRangeInput(target, property, value, range) : getBindedNumberInput(target, property, value);
        } else {
            throw new Error("Unsupported type");
        }
        div.appendChild(input);
    }
    return div;
};
var getHtmlFormElement = function(params) {
    var form = document.createElement("form");
    form.appendChild(getBindedInput(params, "width"));
    form.appendChild(getBindedInput(params, "height"));
    form.appendChild(getBindedInput(params, "colors"));
    form.appendChild(getBindedInput(params, "chaos", {
        range: [
            0,
            1,
            0.01
        ]
    }));
    form.appendChild(getBindedInput(params, "grain", {
        range: [
            0,
            1,
            0.01
        ]
    }));
    form.appendChild(getBindedInput(params, "log-temperature", {
        range: [
            -3,
            0,
            0.01
        ]
    }));
    form.appendChild(getBindedInput(params, "seed"));
    form.appendChild(getBindedInput(params, "speed", {
        range: [
            -1,
            1,
            0.1
        ]
    }));
    return form;
};
var getCreateBuffer = function(device, usage) {
    return function(data) {
        if (typeof data === "number") data = new Float32Array(data);
        var buffer = device.createBuffer({
            size: data.byteLength,
            usage: usage,
            mappedAtCreation: true
        });
        var mappedBuffer = new Uint8Array(buffer.getMappedRange());
        if (ArrayBuffer.isView(data)) data = data.buffer;
        mappedBuffer.set(new Uint8Array(data));
        buffer.unmap();
        return buffer;
    };
};
var main = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function() {
        var params, shaderUrls, code, gpu, adapter, device, wrapper, caption, canvas, gui, context, format, vertices, indices, createStorageBuffer, createUniformBuffer, createVertexBuffer, createIndexBuffer, vertexBuffer, indexBuffer, buffers, chaosBuffer, grainBuffer, temperatureBuffer, zBuffer, colorValues, colorBuffer, resize, module, pipeline, renderBindGroup, seedElement, previousTimestamp, update, render, animate;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    params = parseParams(new URLSearchParams(location.search));
                    shaderUrls = [
                        "./shaders/noise.wgsl",
                        "./shaders/color.wgsl",
                        "./shaders/render.wgsl"
                    ];
                    return [
                        4,
                        Promise.all(shaderUrls.map(function(url) {
                            return fetch(url).then(function(response) {
                                return response.text();
                            });
                        }))
                    ];
                case 1:
                    code = _state.sent().join("\n");
                    gpu = navigator.gpu;
                    return [
                        4,
                        gpu.requestAdapter()
                    ];
                case 2:
                    adapter = _state.sent();
                    return [
                        4,
                        adapter.requestDevice()
                    ];
                case 3:
                    device = _state.sent();
                    wrapper = document.createElement("div");
                    wrapper.id = "wrapper";
                    caption = document.createElement("p");
                    caption.onclick = function() {
                        canvas.toBlob(function(blob) {
                            var a = document.createElement("a");
                            var url = URL.createObjectURL(blob);
                            a.href = url;
                            a.download = "image.png";
                            a.click();
                            URL.revokeObjectURL(url);
                        });
                    };
                    canvas = document.createElement("canvas");
                    gui = document.createElement("div");
                    gui.appendChild(getHtmlFormElement(params));
                    gui.id = "gui";
                    wrapper.appendChild(canvas);
                    wrapper.appendChild(caption);
                    document.body.appendChild(wrapper);
                    document.body.appendChild(gui);
                    context = canvas.getContext("webgpu");
                    format = gpu.getPreferredCanvasFormat();
                    context.configure({
                        device: device,
                        format: format
                    });
                    vertices = new Float32Array([
                        -1,
                        -1,
                        -1,
                        1,
                        1,
                        -1,
                        1,
                        1
                    ]);
                    indices = new Uint32Array([
                        0,
                        1,
                        2,
                        2,
                        1,
                        3
                    ]);
                    createStorageBuffer = getCreateBuffer(device, GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST);
                    createUniformBuffer = getCreateBuffer(device, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST);
                    createVertexBuffer = getCreateBuffer(device, GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST);
                    createIndexBuffer = getCreateBuffer(device, GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST);
                    vertexBuffer = createVertexBuffer(vertices);
                    indexBuffer = createIndexBuffer(indices);
                    buffers = new Map();
                    {
                        chaosBuffer = createUniformBuffer(new Float32Array([
                            params.chaos
                        ]));
                        grainBuffer = createUniformBuffer(new Float32Array([
                            params.grain
                        ]));
                        temperatureBuffer = createUniformBuffer(new Float32Array([
                            Math.pow(10, params["log-temperature"])
                        ]));
                        zBuffer = createUniformBuffer(new Float32Array([
                            params.seed
                        ]));
                        colorValues = new Float32Array(params.colors.map(function(e) {
                            return _to_consumable_array(hexToRgb(e)).concat([
                                1
                            ]);
                        }).flat());
                        colorBuffer = createStorageBuffer(colorValues);
                        buffers.set("vertex", vertexBuffer);
                        buffers.set("index", indexBuffer);
                        buffers.set("color", colorBuffer);
                        buffers.set("chaos", chaosBuffer);
                        buffers.set("grain", grainBuffer);
                        buffers.set("temperature", temperatureBuffer);
                        buffers.set("z", zBuffer);
                    }
                    resize = function() {
                        wrapper.style.aspectRatio = "".concat(params.width, "/").concat(params.height);
                        caption.innerHTML = "Click here to download image";
                        caption.innerHTML += "<br>";
                        caption.innerHTML += "".concat(params.width, " &times; ").concat(params.height);
                        canvas.width = params.width;
                        canvas.height = params.height;
                    };
                    gui.querySelector("input[name=width]").addEventListener("input", resize);
                    gui.querySelector("input[name=height]").addEventListener("input", resize);
                    resize();
                    module = device.createShaderModule({
                        code: code
                    });
                    pipeline = device.createRenderPipeline({
                        vertex: {
                            module: module,
                            buffers: [
                                {
                                    arrayStride: 2 * 4,
                                    attributes: [
                                        {
                                            format: "float32x2",
                                            offset: 0,
                                            shaderLocation: 0
                                        }
                                    ]
                                }
                            ]
                        },
                        fragment: {
                            module: module,
                            targets: [
                                {
                                    format: format
                                }
                            ]
                        },
                        layout: "auto"
                    });
                    renderBindGroup = device.createBindGroup({
                        layout: pipeline.getBindGroupLayout(0),
                        entries: [
                            {
                                binding: 0,
                                resource: {
                                    buffer: buffers.get("color")
                                }
                            },
                            {
                                binding: 1,
                                resource: {
                                    buffer: buffers.get("chaos")
                                }
                            },
                            {
                                binding: 2,
                                resource: {
                                    buffer: buffers.get("grain")
                                }
                            },
                            {
                                binding: 3,
                                resource: {
                                    buffer: buffers.get("temperature")
                                }
                            },
                            {
                                binding: 4,
                                resource: {
                                    buffer: buffers.get("z")
                                }
                            }
                        ]
                    });
                    gui.querySelector("form[name=colors]").onchange = function() {
                        var colorValues;
                        try {
                            colorValues = new Float32Array(params.colors.map(function(e) {
                                return _to_consumable_array(hexToRgb(e)).concat([
                                    1
                                ]);
                            }).flat());
                        } catch (_) {
                            return;
                        }
                        var colorBuffer = createStorageBuffer(colorValues);
                        renderBindGroup = device.createBindGroup({
                            layout: pipeline.getBindGroupLayout(0),
                            entries: [
                                {
                                    binding: 0,
                                    resource: {
                                        buffer: colorBuffer
                                    }
                                },
                                {
                                    binding: 1,
                                    resource: {
                                        buffer: buffers.get("chaos")
                                    }
                                },
                                {
                                    binding: 2,
                                    resource: {
                                        buffer: buffers.get("grain")
                                    }
                                },
                                {
                                    binding: 3,
                                    resource: {
                                        buffer: buffers.get("temperature")
                                    }
                                },
                                {
                                    binding: 4,
                                    resource: {
                                        buffer: buffers.get("z")
                                    }
                                }
                            ]
                        });
                        buffers.get("color").destroy();
                        buffers.set("color", colorBuffer);
                    };
                    seedElement = gui.querySelector("input[name=seed]");
                    previousTimestamp = 0;
                    update = function(timestamp) {
                        var elapsed = timestamp - previousTimestamp;
                        var previousSeed = parseInt(seedElement.value);
                        var previousZ = uint32ToFloat32(previousSeed);
                        var z = previousZ + elapsed * 0.001 * params.speed;
                        var newSeed = float32ToUint32(z);
                        seedElement.value = newSeed.toString();
                        device.queue.writeBuffer(buffers.get("chaos"), 0, new Float32Array([
                            params.chaos
                        ]));
                        device.queue.writeBuffer(buffers.get("grain"), 0, new Float32Array([
                            params.grain
                        ]));
                        device.queue.writeBuffer(buffers.get("temperature"), 0, new Float32Array([
                            Math.pow(10, params["log-temperature"])
                        ]));
                        device.queue.writeBuffer(buffers.get("z"), 0, new Float32Array([
                            z
                        ]));
                        previousTimestamp = timestamp;
                    };
                    render = function(_) {
                        var encoder = device.createCommandEncoder();
                        var canvasTexture = context.getCurrentTexture();
                        var colorAttachmentView = canvasTexture.createView();
                        var loadOp = "clear";
                        var storeOp = "store";
                        var renderPassDescriptor = {
                            colorAttachments: [
                                {
                                    view: colorAttachmentView,
                                    loadOp: loadOp,
                                    storeOp: storeOp
                                }
                            ]
                        };
                        var renderPass = encoder.beginRenderPass(renderPassDescriptor);
                        renderPass.setPipeline(pipeline);
                        renderPass.setBindGroup(0, renderBindGroup);
                        renderPass.setVertexBuffer(0, buffers.get("vertex"));
                        renderPass.setIndexBuffer(buffers.get("index"), "uint32");
                        renderPass.drawIndexed(indices.length);
                        renderPass.end();
                        device.queue.submit([
                            encoder.finish()
                        ]);
                    };
                    animate = function(timestamp) {
                        update(timestamp);
                        render(timestamp);
                        requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                    return [
                        2
                    ];
            }
        });
    });
    return function main() {
        return _ref.apply(this, arguments);
    };
}();
onload = main;

