/*! Built with http://stenciljs.com */
const { h } = window.jsonschemadesigner;

class ItemDetailsComponent {
    constructor() {
        this._tickle = 0;
    }
    rerender() {
        this._tickle++;
        this.parent.rerender();
    }
    componentWillLoad() {
        if (this.item.enum && this.item.enum.length) {
            this.enumCtrlExpanded = true;
        }
    }
    render() {
        //computed classes
        const requiredCheckBoxStyle = this.item.isRoot ? 'form-check disabled' : 'form-check'; //TODO: style="padding: 2px 0;"
        //Item Casts for Specific Fields
        const refItem = this.item;
        const stringItem = this.item;
        const numberItem = this.item;
        const objectItem = this.item;
        const arrayItem = this.item;
        const enums = this.item.enum ? this.item.enum : [];
        const basicFields = (h("div", { class: "col border-right" },
            h("div", { class: "t_color bold" },
                " ",
                this.i18n.translate('json-schema-designer.general'),
                " "),
            h("div", null,
                h("form", { class: "form-horizontal form-compact model-detail-form", name: "detailForm", role: "form" },
                    h("div", { class: "form-group" },
                        h("label", { class: "control-label col-xs-2" },
                            " ",
                            this.i18n.translate('json-schema-designer.title'),
                            " "),
                        h("div", { class: "col-xs-9" },
                            h("input", { type: "text", class: "form-control sm detail-ip", id: "foldName", value: this.item.title, name: "title", onInput: (event) => {
                                    const input = event.target;
                                    this.item.title = input.value;
                                    this.rerender();
                                } }))),
                    h("div", { class: "form-group" },
                        h("label", { class: "control-label col-xs-2" },
                            " ",
                            this.i18n.translate('json-schema-designer.description'),
                            " "),
                        h("div", { class: "col-xs-9" },
                            h("textarea", { class: "form-control", value: this.item.description, onInput: (event) => {
                                    const input = event.target;
                                    this.item.description = input.value;
                                    this.rerender();
                                } }))),
                    h("div", { class: "form-group" },
                        h("label", { class: "control-label col-xs-2" },
                            " ",
                            this.i18n.translate('json-schema-designer.default'),
                            " "),
                        h("div", { class: "col-xs-9" },
                            h("input", { type: "text", class: "form-control sm detail-ip", value: this.item.default, onInput: (event) => {
                                    const input = event.target;
                                    this.item.default = input.value;
                                    this.rerender();
                                } }))),
                    this.item.type === 'null'
                        ? h("div", null)
                        : h("div", null,
                            h("div", { class: requiredCheckBoxStyle },
                                h("label", null,
                                    h("input", { type: "checkbox", checked: this.item.isRequired, onInput: (event) => {
                                            if (this.item.isRoot)
                                                return;
                                            const input = event.target;
                                            this.item.isRequired = input.checked;
                                            this.rerender();
                                        } }),
                                    " ",
                                    this.i18n.translate('json-schema-designer.required'),
                                    " ")),
                            h("div", { class: "form-check" },
                                h("label", null,
                                    h("input", { type: "checkbox", checked: this.item.isNullable, onInput: (event) => {
                                            if (this.item.isRoot)
                                                return;
                                            const input = event.target;
                                            this.item.isNullable = input.checked;
                                            this.rerender();
                                        } }),
                                    " ",
                                    this.i18n.translate('json-schema-designer.nullable'),
                                    " ")),
                            h("div", null,
                                h("div", { class: "enum-control-bar", onClick: () => {
                                        this.enumCtrlExpanded = !this.enumCtrlExpanded;
                                    } },
                                    this.enumCtrlExpanded
                                        ? h("i", { class: "btn fas fa-chevron-down" })
                                        : h("i", { class: "btn fas fa-chevron-right" }),
                                    h("label", null,
                                        " ",
                                        this.i18n.translate('json-schema-designer.enumerated-values'),
                                        " ")),
                                this.enumCtrlExpanded
                                    ? h("div", null,
                                        enums.map((enumObject, index) => h("div", { class: "enum-row" },
                                            h("input", { type: enumObject.type, class: "form-control form-control-sm", value: enumObject.value, onInput: (event) => {
                                                    const input = event.target;
                                                    this.item.enum[index].value = input.value;
                                                    this.rerender();
                                                } }),
                                            h("select", { class: "custom-select custom-select-sm", onInput: (event) => {
                                                    const input = event.target;
                                                    this.item.enum[index].type = input.value;
                                                    this.rerender();
                                                } },
                                                h("option", { value: 'string' }, this.i18n.translate('json-schema-designer.string')),
                                                h("option", { value: 'number' }, this.i18n.translate('json-schema-designer.number'))),
                                            h("i", { class: "btn fas fa-times", onClick: () => {
                                                    this.item.removeEnumValue(index);
                                                    this.rerender();
                                                } }))),
                                        h("div", { class: "text-center" },
                                            h("button", { type: "button", class: "btn btn-secondary btn-sm", onClick: () => {
                                                    this.item.addEnumValue();
                                                    this.rerender();
                                                } },
                                                h("i", { class: "fas fa-plus" }),
                                                this.i18n.translate('json-schema-designer.add-value'))))
                                    : h("div", null)))))));
        const stringFields = (h("div", { class: "col" },
            h("form", null,
                h("div", { class: "t_color bold" },
                    " ",
                    this.i18n.translate('json-schema-designer.numeric'),
                    " "),
                h("div", { class: "form-group row" },
                    h("label", { class: "col-sm-8 col-form-label" },
                        this.i18n.translate('json-schema-designer.minimum-length'),
                        ":"),
                    h("div", { class: "col-sm-4" },
                        h("input", { type: "number", class: "form-control form-control-sm", value: stringItem.minLength, min: "1", onInput: (event) => {
                                const input = event.target;
                                stringItem.minLength = Number(input.value);
                                this.rerender();
                            } }))),
                h("div", { class: "form-group row" },
                    h("label", { class: "col-sm-8 col-form-label" }, this.i18n.translate('json-schema-designer.maximum-length')),
                    h("div", { class: "col-sm-4" },
                        h("input", { type: "number", class: "form-control form-control-sm", value: stringItem.maxLength, min: "1", onInput: (event) => {
                                const input = event.target;
                                stringItem.maxLength = Number(input.value);
                                this.rerender();
                            } }))),
                h("div", { class: "form-group" },
                    h("label", null,
                        " ",
                        this.i18n.translate('json-schema-designer.format'),
                        ": "),
                    h("input", { type: "text", class: "form-control form-control-sm", value: stringItem.format, onInput: (event) => {
                            const input = event.target;
                            stringItem.format = input.value;
                            this.rerender();
                        } })),
                h("div", { class: "form-group" },
                    h("label", null,
                        " ",
                        this.i18n.translate('json-schema-designer.pattern'),
                        ": "),
                    h("input", { type: "text", class: "form-control form-control-sm", value: stringItem.pattern, min: "0", onInput: (event) => {
                            const input = event.target;
                            stringItem.pattern = input.value;
                            this.rerender();
                        } })))));
        const numberFields = (h("div", { class: "col" },
            h("form", null,
                h("div", { class: "t_color bold" },
                    " ",
                    this.i18n.translate('json-schema-designer.numeric'),
                    " "),
                h("div", { class: "form-group row" },
                    h("label", { class: "col-sm-6 col-form-label" }, this.i18n.translate('json-schema-designer.minimum')),
                    h("div", { class: "col-sm-6 " },
                        h("input", { type: "number", class: "form-control form-control-sm", value: numberItem.minimum, onInput: (event) => {
                                const input = event.target;
                                numberItem.minimum = Number(input.value);
                                this.rerender();
                            } })),
                    h("div", { class: "form-check" },
                        h("label", null,
                            h("input", { type: "checkbox", checked: numberItem.exclusiveMinimum, onInput: (event) => {
                                    const input = event.target;
                                    numberItem.exclusiveMinimum = input.checked;
                                    this.rerender();
                                } }),
                            " ",
                            this.i18n.translate('json-schema-designer.exclusive'),
                            " "))),
                h("div", { class: "form-group row" },
                    h("label", { class: "col-sm-6 col-form-label" }, this.i18n.translate('json-schema-designer.maximum')),
                    h("div", { class: "col-sm-6 " },
                        h("input", { type: "number", class: "form-control form-control-sm", value: numberItem.maximum, onInput: (event) => {
                                const input = event.target;
                                numberItem.maximum = Number(input.value);
                                this.rerender();
                            } })),
                    h("div", { class: "form-check" },
                        h("label", null,
                            h("input", { type: "checkbox", checked: numberItem.exclusiveMaximum, onInput: (event) => {
                                    const input = event.target;
                                    numberItem.exclusiveMaximum = input.checked;
                                    this.rerender();
                                } }),
                            " ",
                            this.i18n.translate('json-schema-designer.exclusive'),
                            " "))),
                h("div", { class: "form-group" },
                    h("label", null,
                        " ",
                        this.i18n.translate('json-schema-designer.multiple-of'),
                        ": "),
                    h("input", { type: "number", class: "form-control form-control-sm", value: numberItem.multipleOf, onInput: (event) => {
                            const input = event.target;
                            numberItem.multipleOf = Number(input.value);
                            this.rerender();
                        } })))));
        const objectFields = (h("div", { class: "col" },
            h("form", null,
                h("div", { class: "t_color bold" }, " Object "),
                h("div", { class: "form-group" },
                    h("label", null,
                        " ",
                        this.i18n.translate('json-schema-designer.schema'),
                        ": "),
                    h("input", { type: "text", class: "form-control form-control-sm", value: objectItem.schema, onInput: (event) => {
                            const input = event.target;
                            objectItem.schema = input.value;
                            this.rerender();
                        } })),
                h("div", { class: "form-group row" },
                    h("label", { class: "col-sm-8 col-form-label" },
                        this.i18n.translate('json-schema-designer.minimum-properties'),
                        ":"),
                    h("div", { class: "col-sm-4" },
                        h("input", { type: "number", class: "form-control form-control-sm", value: objectItem.minProperties, min: "1", onInput: (event) => {
                                const input = event.target;
                                objectItem.minProperties = Number(input.value);
                                this.rerender();
                            } }))),
                h("div", { class: "form-group row" },
                    h("label", { class: "col-sm-8 col-form-label" },
                        this.i18n.translate('json-schema-designer.maximum-properties'),
                        ":"),
                    h("div", { class: "col-sm-4" },
                        h("input", { type: "number", class: "form-control form-control-sm", value: objectItem.maxProperties, min: "1", onInput: (event) => {
                                const input = event.target;
                                objectItem.maxProperties = Number(input.value);
                                this.rerender();
                            } }))),
                h("div", { class: "form-group" },
                    h("div", { class: "form-check" },
                        h("label", null,
                            h("input", { type: "checkbox", checked: objectItem.canHaveAdditionalProperties, onInput: (event) => {
                                    const input = event.target;
                                    objectItem.canHaveAdditionalProperties = input.checked;
                                    this.rerender();
                                } }),
                            " ",
                            this.i18n.translate('json-schema-designer.allow-additional-properties'),
                            " "))),
                h("div", { class: "form-group" },
                    h("label", null,
                        " ",
                        this.i18n.translate('json-schema-designer.additional-properties'),
                        ": "),
                    h("input", { type: "text", class: "form-control form-control-sm", value: objectItem.additionalProperties, onInput: (event) => {
                            const input = event.target;
                            objectItem.additionalProperties = input.value;
                            this.rerender();
                        } })))));
        const arrayFields = (h("div", { class: "col" },
            h("form", null,
                h("div", { class: "t_color bold" },
                    " ",
                    this.i18n.translate('json-schema-designer.array'),
                    " "),
                h("div", { class: "form-group row" },
                    h("label", { class: "col-sm-8 col-form-label" },
                        this.i18n.translate('json-schema-designer.minimum-items'),
                        ":"),
                    h("div", { class: "col-sm-4" },
                        h("input", { type: "number", class: "form-control form-control-sm", value: arrayItem.minItems, min: "1", onInput: (event) => {
                                const input = event.target;
                                arrayItem.minItems = Number(input.value);
                                this.rerender();
                            } }))),
                h("div", { class: "form-group row" },
                    h("label", { class: "col-sm-8 col-form-label" },
                        this.i18n.translate('json-schema-designer.maximum-items'),
                        ":"),
                    h("div", { class: "col-sm-4" },
                        h("input", { type: "number", class: "form-control form-control-sm", value: arrayItem.maxItems, min: "1", onInput: (event) => {
                                const input = event.target;
                                arrayItem.maxItems = Number(input.value);
                                this.rerender();
                            } }))),
                h("div", { class: "form-group" },
                    h("div", { class: "form-check" },
                        h("label", null,
                            h("input", { type: "checkbox", checked: arrayItem.uniqueItems, onInput: (event) => {
                                    const input = event.target;
                                    arrayItem.uniqueItems = input.checked;
                                    this.rerender();
                                } }),
                            " ",
                            this.i18n.translate('json-schema-designer.unique-items'),
                            " "))),
                h("div", { class: "form-group" },
                    h("div", { class: "form-check" },
                        h("label", null,
                            h("input", { type: "checkbox", checked: arrayItem.additionalItems, onInput: (event) => {
                                    const input = event.target;
                                    arrayItem.additionalItems = input.checked;
                                    this.rerender();
                                } }),
                            " ",
                            this.i18n.translate('json-schema-designer.additional-items'),
                            " "))))));
        const refFields = (h("div", { class: "col" },
            h("div", { class: "form-group" },
                h("label", { class: "control-label col-xs-2" },
                    " ",
                    this.i18n.translate('json-schema-designer.reference'),
                    ": "),
                h("div", { class: "col-xs-9" },
                    h("input", { type: "text", value: refItem.$ref, class: "form-control sm detail-ip", onInput: (event) => {
                            const input = event.target;
                            refItem.$ref = input.value;
                            this.rerender();
                        } })))));
        let typeSpecificFields;
        switch (this.item.type) {
            case 'string':
                typeSpecificFields = stringFields;
                break;
            case 'number':
                typeSpecificFields = numberFields;
                break;
            case 'object':
                typeSpecificFields = objectFields;
                break;
            case 'array':
                typeSpecificFields = arrayFields;
                break;
            default:
                typeSpecificFields = (h("div", null));
        }
        return (h("div", { class: "model-det-cont container" }, this.item.type === '$ref'
            ? h("div", { class: "row" }, refFields)
            : h("div", { class: "row" },
                basicFields,
                typeSpecificFields)));
    }
    static get is() { return "item-details"; }
    static get properties() { return {
        "_tickle": {
            "state": true
        },
        "enumCtrlExpanded": {
            "state": true
        },
        "i18n": {
            "context": "i18n"
        },
        "item": {
            "type": "Any",
            "attr": "item"
        },
        "parent": {
            "type": "Any",
            "attr": "parent"
        }
    }; }
}

function _createAppropriateSchemaItem(json, parent) {
    if (json.$ref) {
        return new SchemaReference(json, parent);
    }
    else {
        let mainType;
        if (Array.isArray(json.type)) {
            mainType = json.type.find((item) => {
                return item !== 'null';
            });
        }
        else {
            mainType = json.type;
        }
        switch (mainType) {
            case 'object':
                return new SchemaObject(json, parent);
            case 'array':
                return new SchemaArray(json, parent);
            case 'string':
                return new SchemaString(json, parent);
            case 'integer':
            case 'number':
                return new SchemaNumeric(json, parent);
            default:
                return new SchemaBasic(json, parent);
        }
    }
}
function _generateId() {
    let placeholder = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return placeholder.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
class SchemaBasic {
    constructor(json, parent) {
        if (json._id) {
            this._id = json._id;
        }
        else {
            this._id = _generateId();
        }
        this.title = json.title;
        this.description = json.description;
        this.parent = parent;
        this.default = json.default;
        this.isRequired = json.isRequired || false;
        this.definitionName = json.definitionName;
        this.isDefinition = json.isDefinition;
        // construct enum array
        this.enum = [];
        if (json.enum) {
            json.enum.forEach((enumValue) => {
                this.enum.push({
                    value: enumValue,
                    type: typeof (enumValue)
                });
            });
        }
        // handle types
        if (Array.isArray(json.type)) {
            if (json.type.length > 2) {
                console.error('more than two types not supported');
            }
            if (!json.type.includes('null')) {
                console.error('multiple types can only include null and an additional value');
            }
            json.type.forEach((typeItem) => {
                if (typeItem === 'null') {
                    this.isNullable = true;
                }
                else {
                    this.type = typeItem;
                }
            });
        }
        else {
            this.type = json.type || 'string';
        }
    }
    addEnumValue() {
        this.enum.push({});
    }
    removeEnumValue(index) {
        this.enum.splice(index, 1);
    }
    jsonSchema() {
        let output = {
            title: this.title ? this.title : undefined,
            description: this.description ? this.description : undefined,
            default: this.default ? this.default : undefined,
        };
        if (this.isNullable) {
            output.type = [this.type, 'null'];
        }
        else {
            output.type = this.type;
        }
        if (this.enum && this.enum.length) {
            output.enum = this.enum.map((enumObject) => {
                if (enumObject.type === "number") {
                    return Number(enumObject.value);
                }
                else {
                    return enumObject.value;
                }
            });
        }
        return output;
    }
    changeType(targetType) {
        const complexTypes = [
            'string',
            'number',
            'integer',
            'object',
            'array',
            '$ref'
        ];
        if (targetType === this.type) {
            return;
        }
        const needToCreateNewObject = complexTypes.includes(this.type) || complexTypes.includes(targetType);
        if (needToCreateNewObject) {
            const valuesToCopy = {
                title: this.title,
                description: this.description,
                type: targetType,
                isRequired: this.isRequired,
                _id: this._id,
                definitionName: this.definitionName,
                isDefinition: this.isDefinition
            };
            let newObject = _createAppropriateSchemaItem(valuesToCopy, this.parent);
            this.parent.replaceChild(newObject);
        }
        else {
            this.type = targetType;
        }
    }
}
class SchemaString extends SchemaBasic {
    constructor(json, parent) {
        super(json, parent);
        this.minLength = json.minLength;
        this.maxLength = json.maxLength;
        this.pattern = json.pattern;
        this.format = json.format;
    }
    jsonSchema() {
        let output = super.jsonSchema();
        output.minLength = this.minLength ? this.minLength : undefined;
        output.maxLength = this.maxLength ? this.maxLength : undefined;
        output.pattern = this.pattern ? this.pattern : undefined;
        output.format = this.format ? this.format : undefined;
        return output;
    }
}
class SchemaNumeric extends SchemaBasic {
    constructor(json, parent) {
        super(json, parent);
        this.multipleOf = json.multipleOf;
        this.minimum = json.minimum;
        this.exclusiveMinimum = json.exclusiveMinimum;
        this.maximum = json.maximum;
        this.exclusiveMaximum = json.exclusiveMaximum;
    }
    jsonSchema() {
        let output = super.jsonSchema();
        output.multipleOf = this.multipleOf ? this.multipleOf : undefined;
        output.minimum = this.minimum ? this.minimum : undefined;
        output.exclusiveMinimum = this.exclusiveMinimum ? this.exclusiveMinimum : undefined;
        output.maximum = this.maximum ? this.maximum : undefined;
        output.exclusiveMaximum = this.exclusiveMaximum ? this.exclusiveMaximum : undefined;
        return output;
    }
}
class SchemaReference extends SchemaBasic {
    constructor(json, parent) {
        super(json, parent);
        this.$ref = json.$ref;
        this.type = '$ref';
    }
    jsonSchema() {
        return {
            $ref: this.$ref
        };
    }
}
class SchemaObject extends SchemaBasic {
    //dependancies: any; TODO: Advanced Feature
    constructor(json, parent) {
        super(json, parent);
        this.schema = json.$schema;
        this.properties = {};
        this.isRoot = !parent;
        this.isRequired = this.isRoot;
        if (typeof (json.additionalProperties) === 'boolean') {
            this.canHaveAdditionalProperties = json.additionalProperties;
        }
        else if (json.additionalProperties) {
            this.canHaveAdditionalProperties = true;
            this.additionalProperties = json.additionalProperties;
        }
        else {
            this.canHaveAdditionalProperties = false;
        }
        this.minProperties = json.minProperties;
        this.maxProperties = json.maxProperties;
        if (json.properties) {
            Object.entries(json.properties).forEach((entry) => {
                let key = entry[0];
                let value = entry[1];
                value.title = key;
                const newProperty = _createAppropriateSchemaItem(value, this);
                this.properties[newProperty._id] = newProperty;
            });
        }
        if (json.required) {
            json.required.forEach((requiredItemName) => {
                Object.values(this.properties).find((property) => {
                    return property.title === requiredItemName;
                }).isRequired = true;
            });
        }
        if (json.definitions) {
            this.definitions = {};
            Object.entries(json.definitions).forEach((keyVal) => {
                const key = keyVal[0];
                const value = keyVal[1];
                value.definitionName = key;
                value.isDefinition = true;
                const definition = _createAppropriateSchemaItem(value, this);
                this.definitions[definition._id] = definition;
            });
        }
    }
    jsonSchema() {
        let output = super.jsonSchema();
        output.$schema = this.schema ? this.schema : undefined;
        output.required = [];
        output.properties = {};
        output.minProperties = this.minProperties ? this.minProperties : undefined;
        output.maxProperties = this.maxProperties ? this.maxProperties : undefined;
        output.additionalProperties = this.additionalProperties ? this.additionalProperties : this.canHaveAdditionalProperties;
        Object.values(this.properties).forEach((property) => {
            output.properties[property.title] = property.jsonSchema();
            delete output.properties[property.title].title;
            if (property.isRequired) {
                output.required.push(property.title);
            }
        });
        if (this.definitions && Object.values(this.definitions).length) {
            output.definitions = {};
            Object.entries(this.definitions).forEach((keyValue) => {
                const value = keyValue[1];
                output.definitions[value.definitionName] = value.jsonSchema();
            });
        }
        return output;
    }
    jsonSchemaString() {
        return JSON.stringify(this.jsonSchema(), null, 2);
    }
    removeChild(_id) {
        if (this.properties[_id]) {
            delete this.properties[_id];
        }
        else if (this.definitions[_id]) {
            delete this.definitions[_id];
        }
    }
    addChild() {
        const newProp = new SchemaBasic({}, this);
        this.properties[newProp._id] = newProp;
    }
    getChildren() {
        return Object.values(this.properties) || [];
    }
    replaceChild(newItem) {
        if (this.properties[newItem._id]) {
            this.properties[newItem._id] = newItem;
        }
        else if (this.definitions[newItem._id]) {
            this.definitions[newItem._id] = newItem;
        }
    }
    getDefinitions() {
        return this.definitions ? Object.values(this.definitions) : [];
    }
    addDefinition() {
        const newDef = new SchemaBasic({}, this);
        newDef.isDefinition = true;
        this.definitions[newDef._id] = newDef;
    }
}
class SchemaArray extends SchemaBasic {
    constructor(json, parent) {
        super(json, parent);
        this.schema = json.$schema;
        this.items = [];
        let items = json.items || { title: 'Item 1' };
        items = items.length ? items : [items];
        items.forEach((item) => {
            this.items.push(_createAppropriateSchemaItem(item, this));
        });
    }
    jsonSchema() {
        let output = super.jsonSchema();
        output.$schema = this.schema;
        output.additionalItems = this.additionalItems;
        output.minItems = this.minItems ? this.minItems : undefined;
        output.maxItems = this.maxItems ? this.maxItems : undefined;
        output.uniqueItems = this.uniqueItems;
        if (this.items.length) {
            if (this.items.length > 1) {
                output['items'] = [];
                this.items.forEach((item) => {
                    output['items'].push(item.jsonSchema());
                });
            }
            else {
                output['items'] = this.items[0].jsonSchema();
            }
        }
        return output;
    }
    removeChild(id) {
        this.items = this.items.filter((item) => {
            return item._id != id;
        });
    }
    addChild() {
        const title = 'Item ' + (this.getChildren().length + 1);
        this.items.push(new SchemaBasic({ title }, this));
    }
    getChildren() {
        return this.items;
    }
    replaceChild(newItem) {
        this.items.forEach((item, index) => {
            if (item.title === newItem.title) {
                this.items[index] = newItem;
            }
        });
    }
}

class DesignerComponent {
    constructor() {
        this.viewMode = 'tabs';
        this.activeTab = 'designer';
        this._tickle = 0;
    }
    exportSchema() {
        this.outputSchemaCallback && this.outputSchemaCallback(this.workingSchema.jsonSchemaString());
    }
    componentWillLoad() {
        const testData = {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "title": "Skype for Business Application Properties",
            "description": "Defines the basic configuration for the Skype for Business client",
            "type": "object",
            "properties": {
                "displayType": {
                    "default": "widget",
                    "description": "Dictates the way the application will appear and function inside of PureCloud",
                    "type": "string",
                    "title": "Application Type",
                    "enum": [
                        "widget",
                        "panda",
                        "armpit"
                    ]
                },
                "groupFilter": {
                    "$ref": "#/definitions/purecloudGroupIdFilterList"
                },
                "numbertype": {
                    "default": "widget",
                    "description": "Dictates the way the application will appear and function inside of PureCloud",
                    "type": "number",
                    "title": "Application Type",
                    "enum": [
                        1,
                        2,
                        3
                    ]
                }
            },
            "additionalProperties": false,
            "displayOrder": [
                "displayType",
                "groupFilter"
            ],
            "definitions": {
                "purecloudGroupIdFilterList": {
                    "type": [
                        "null",
                        "array"
                    ],
                    "title": "Group Filtering",
                    "description": "Limit visibility of permissioned users to selected groups. Leaving blank will allow visibility for all users in this integration's defined permissions.",
                    "items": {
                        "type": "string",
                        "title": "Group GUID",
                        "pattern": "^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$"
                    }
                }
            }
        };
        this.workingSchema = this.inputSchema ? new SchemaObject(this.inputSchema, null) : new SchemaObject(testData, null);
        if (this.inputTranslations)
            this.i18n.transtions = this.inputTranslations;
    }
    componentDidLoad() {
        $('[data-toggle="tooltip"]').tooltip();
    }
    rerender() {
        this._tickle++;
    }
    render() {
        const jsonOutput = this.workingSchema ? this.workingSchema.jsonSchemaString() : "";
        const definitions = this.workingSchema ? this.workingSchema.getDefinitions() : [];
        if (this.viewMode === 'tabs') {
            const desingerPillClass = this.activeTab === 'designer' ? 'nav-link active' : 'nav-link';
            const outputPillClass = this.activeTab === 'output' ? 'nav-link active' : 'nav-link';
            return (h("div", { class: "json-schema-builder container" },
                h("div", { class: "p-3" },
                    h("ul", { class: "nav nav-pills justify-content-center" },
                        h("li", { class: "btn nav-item" },
                            h("div", { class: desingerPillClass, onClick: () => { this.activeTab = 'designer'; } }, " Designer ")),
                        h("li", { class: "btn nav-item" },
                            h("div", { class: outputPillClass, onClick: () => { this.activeTab = 'output'; } }, " Output ")))),
                h("div", { class: "row" }, this.activeTab === 'designer'
                    ? h("div", { class: "col-lg-12" },
                        h("h5", null,
                            " ",
                            this.i18n.translate('json-schema-designer.schema'),
                            " "),
                        h("schema-row", { item: this.workingSchema, parent: this }),
                        h("h5", null,
                            " ",
                            this.i18n.translate('json-schema-designer.definitions'),
                            " "),
                        definitions.map((definition) => h("schema-row", { item: definition, parent: this })),
                        h("div", { class: "text-center" },
                            h("button", { class: "btn btn-secondary btn-sm", onClick: () => {
                                    this.workingSchema.addDefinition();
                                    this.rerender();
                                } },
                                h("i", { class: "fas fa-plus" }),
                                " ",
                                this.i18n.translate('json-schema-designer.add-definition'))))
                    : h("div", { class: "col-lg-12" },
                        h("div", { class: "card card-body bg-light" },
                            h("div", { class: "text-center" },
                                h("button", { class: "btn btn-secondary btn-sm", onClick: () => this.exportSchema() },
                                    " ",
                                    this.i18n.translate('json-schema-designer.export'),
                                    " ")),
                            h("pre", null,
                                " ",
                                jsonOutput))))));
        }
        else if (this.viewMode === 'columns') {
            return (h("div", { class: "json-schema-builder container" },
                h("div", { class: "row" },
                    h("div", { class: "col-lg-6" },
                        h("h5", null,
                            " ",
                            this.i18n.translate('json-schema-designer.schema'),
                            " "),
                        h("schema-row", { item: this.workingSchema, parent: this }),
                        h("h5", null,
                            " ",
                            this.i18n.translate('json-schema-designer.definitions'),
                            " "),
                        definitions.map((definition) => h("schema-row", { item: definition, parent: this })),
                        h("div", { class: "text-center" },
                            h("button", { class: "btn btn-secondary btn-sm", onClick: () => {
                                    this.workingSchema.addDefinition();
                                    this.rerender();
                                } },
                                h("i", { class: "fas fa-plus" }),
                                " ",
                                this.i18n.translate('json-schema-designer.add-definition')))),
                    h("div", { class: "col-lg-6" },
                        h("div", { class: "card card-body bg-light" },
                            h("div", { class: "text-center" },
                                h("button", { class: "btn btn-secondary btn-sm", onClick: () => this.exportSchema() },
                                    " ",
                                    this.i18n.translate('json-schema-designer.export'),
                                    " ")),
                            h("pre", null,
                                " ",
                                jsonOutput))))));
        }
        else {
            console.error('view mode:', '"' + this.viewMode + '"', 'not supported');
            return (h("div", { class: "container" },
                h("h4", { class: 'text-danger' },
                    " ",
                    this.i18n.translate('json-schema-designer.view-mode-not-supported'))));
        }
    }
    static get is() { return "json-schema-designer"; }
    static get properties() { return {
        "_tickle": {
            "state": true
        },
        "activeTab": {
            "state": true
        },
        "i18n": {
            "context": "i18n"
        },
        "inputSchema": {
            "type": "Any",
            "attr": "input-schema"
        },
        "inputTranslations": {
            "type": "Any",
            "attr": "input-translations"
        },
        "outputSchemaCallback": {
            "type": "Any",
            "attr": "output-schema-callback"
        },
        "viewMode": {
            "type": String,
            "attr": "view-mode"
        }
    }; }
    static get style() { return "/****** light blue theme *********/\nbody {\n  font-family: \"Open Sans\",\"Helvetica Neue\",Helvetica,Arial,sans-serif !important\n}\n/*bootstrap over rides*/\n.btn {\n  text-transform: initial\n}\na.btn.round-btn {\n  color: #2196F3\n}\na.btn.round-btn:hover {\n  /*background: #eee;*/\n}\n.btn.btn-href {\n  padding: 0 7px;\n  color: #2196f3\n}\n.btn.btn-href:hover,\n.btn.btn-href:active,\n.btn.btn-href:focus {\n  text-decoration: underline;\n  color: #0a6ebd;\n  outline: none\n}\n.btn .caret,\n.caret {\n  margin-left: 5px\n}\npre {\n  margin: 15px;\n  line-height: 15px\n}\n/*********generic **********/\n.gap {\n  margin-right: 10px\n}\n.btn.btn-primary.btn-themed {\n  background-color: #2196F3\n}\n.btn.btn-primary.btn-themed:active {\n  background-color: #0B76CC;\n  background-image: radial-gradient(circle, #81D4FA 10%, #29B6F6 11%)\n}\n.btn.btn-flat .badge {\n  background: #808080;\n  color: #fff\n}\n.red {\n  color: #F44336\n}\n.blue {\n  color: #2196F3\n}\n.green {\n  color: #4CAF50\n}\n.t_bg {\n  background: #2196f3 !important\n}\n.t_bgc {\n  background-color: #2196f3 !important\n}\n.t_color {\n  color: #2196f3\n}\n.panel-item.red:hover,\n.panel-item.red:active,\n.panel-item.red:focus {\n  color: #E53935 !important\n}\n.panel-item.green:hover,\n.panel-item.green:active,\n.panel-item.green:focus {\n  color: #43A047 !important\n}\n/*********generic end**********/\n.progress-bar.custom {\n  background-color: rgba(33, 150, 243, 0.3)\n}\n.form-control.req-run-count {\n  background: #f5f5f5\n}\n.panel-primary.dark > .panel-heading {\n  background-color: transparent;\n  border-color: #7D7D7D\n}\n.controls {\n  border: 1px solid rgb(229,229,229);\n  border-radius: 4px 4px 0 0;\n  margin-bottom: -1px\n}\n.controls button.btn:active,\n.controls button.btn:focus {\n  outline: none;\n  background: #eee\n}\n.glyphicon.info-icon {\n  color: #9C27B0\n}\nnav.navbar-inverse {\n  background-color: #2196F3;\n  box-shadow: none\n}\n/********Tabs**********/\n.right-cont .tab-container {\n  background: #2196F3\n}\n.right-cont .tab-container ul.nav-tabs > li {\n  background: #1976D2;\n  border: 1px solid #2196F3\n}\n.right-cont .tab-container ul.nav-tabs > li > a {\n  color: #fff;\n  box-shadow: none\n}\n.right-cont .tab-container ul.nav-tabs > li.active {\n  background: #F9F9FB\n}\n.right-cont .tab-container ul.nav-tabs .btn.btn-default:active {\n  background: #9cb5cc\n}\n.right-cont .tab-container .tab-pane.active {\n  background: #F9F9FB;\n  padding: 10px 15px\n}\n.url-cont .run-btn,\n.url-cont .run-extra {\n  background: #2196F3;\n  border: 1px solid #2196F3\n}\n/********Tabs End**********/\n.panel-title.custom {\n  color: inherit;\n  background: #2196F3\n}\n.panel-title.custom:after {\n  content: '';\n  width: 0;\n  position: absolute;\n  height: 0;\n  border-top: 27px solid #2196F3;\n  border-right: 27px solid transparent;\n  right: -27px;\n  top: 0\n}\n.panel.dark {\n  box-shadow: 0 1px 4px rgba(0,0,0,0.14);\n  background: #fff;\n  color: #666\n}\n/*left navigation*/\n/******** Left tabs ****/\n.left-nav .nav-tabs {\n  background: #2196F3;\n  border: 0px;\n  box-shadow: none\n}\n.left-nav .nav-tabs > li > a,\n.left-nav .nav-tabs > li > a:focus {\n  box-shadow: none;\n  color: #E0E0E0\n}\n.left-nav .nav-tabs > li > a:hover,\n.left-nav .nav-tabs > li > a:focus:hover {\n  color: #fff\n}\n.left-nav .nav-tabs > li.active > a,\n.left-nav .nav-tabs > li.active > a:focus {\n  /*box-shadow: inset 0 -3px 0 #fff;*/color: #fff;\n  border-bottom: 4px solid #FFEB3B/*background: #546E7A;*/\n}\n.left-nav .nav-tabs a.tab-optn {\n  color: #fff\n}\n.left-nav .nav .open > a,\n.left-nav .nav .open > a:hover,\n.left-nav .nav .open > a:focus {\n  background: transparent\n}\n/******** Left tabs ****/\n.history .date {\n  color: #455A64\n}\n/*Saved tab*/\n.req-search {\n  background: #fff\n}\n.new-folder .btn-link.save {\n  color: #4caf50;\n  font-size: 20px\n}\n.new-folder .btn-link.cancel {\n  color: #ff0000;\n  font-size: 20px\n}\n.folder {\n  /*border-bottom: 1px solid #eee;*//*background: #f5f5f5;*/\n}\n.folder.opened {\n  background: #f5f5f5;\n  border-bottom: 1px solid #eee\n}\n.folder-icon {\n  color: #2196F3\n}\n.folder.opened .folder-icon {\n  color: #1E88E5\n}\n.savedReq.active .dropdown-toggle:hover a.req-menu,\n.savedReq.active:hover .dropdown-toggle:hover a.req-menu {\n  color: #2196F3\n}\n.savedReq.active {\n  border-left: 4px solid #2196F3\n}\n/*left navigation*/\n/******** response **********/\n.status.success {\n  color: #4CAF50\n}\n.status.warning {\n  color: #FF9800\n}\n.status.error {\n  color: #F44336\n}\n.status.info {\n  color: #03A9F4\n}\n/******** response end**********/\n/********* Modal overrides ***********/\n.modal-title.custom {\n  background: #2196F3\n}\n.modal-title.custom:after {\n  border-top: 37px solid #2196F3;\n  border-right: 37px solid transparent;\n  right: -37px\n}\n.btn.folder-select:active,\n.btn.folder-select:focus {\n  background: #e6e6e6\n}\n.folder-select.active {\n  background-color: #e6e6e6;\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125)\n}\n/********* Modal overrides end***********/\n/******** Error Container********/\n.error-cont>.glyphicon-info-sign {\n  font-size: 45px;\n  color: #FF9800\n}\n/******** Error Container End********/\n/*******cancel container *************/\n/*******cancel container end *********/\n/******* Loop Run Response *******/\n/******* Loop Run Response End*******/\n/******* Scripts Container*******/\n/******* Scripts Container End*******/\n/********** SCroll bar *******/\n::-webkit-scrollbar {\n  width: 8px;\n  height: 8px;\n  border-radius: 3px\n}\n::-webkit-scrollbar-button {\n  /*display: none;*/\n}\n::-webkit-scrollbar-track {\n  background-color: #f5f5f5/*box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/\n}\n::-webkit-scrollbar-thumb:hover {\n  background-color: #777\n}\n::-webkit-scrollbar-thumb {\n  background-color: #999;\n  border-radius: 0px/*box-shadow: inset 0 0 6px rgba(0,0,0,0.5);*/\n}\n::-webkit-scrollbar-corner {\n  background-color: #fff\n}\n/****** EnvModal.css*****************/\n.addEnvBtn a.btn {\n  background: #F44336;\n  color: #fff\n}\n.env-optn .icon {\n  background: #fff\n}\n.env-optn .icon.green:hover {\n  background: #4CAF50;\n  color: #fff\n}\n.env-optn .icon.red:hover {\n  background: #F44336;\n  color: #fff\n}\n.env-optn .icon.blue:hover {\n  background: #2196F3;\n  color: #fff\n}\n.envList ul li.active a {\n  background: #E0E0E0;\n  font-weight: bold;\n  border-radius: 0\n}\n/****** EnvModal.css END*****************/\n/****** menuModal.css *****************/\n.menuModal .heading {\n  color: #fff;\n  background: #2196F3\n}\n/****** menuodal.css END*****************/\n/****** tests.css *****************/\n.project .l-sec .icon {\n  color: #2196F3\n}\n.project.opened .l-sec .icon {\n  color: #1E88E5\n}\n.suit .icon {\n  color: #2196F3\n}\n/****** tests.css END*****************/\n/****** login.css *****************/\n.login-modal .login-bg:before {\n  background: #2196F3\n}\n/****** login.css END*****************/\n.json-schema-builder ul {\n  list-style-type: none;\n  padding: 0;\n  margin: 0\n}\n.json-schema-builder li {\n  list-style-type: none;\n  padding: 0;\n  margin: 0\n}\n.json-schema-builder button.wrapper-only {\n  border: none;\n  background: none;\n  padding: 0px;\n  margin: 0px\n}\n.json-schema-builder i {\n  color: black\n}\n.json-schema-builder i:hover {\n  cursor: pointer\n}\n.json-schema-builder i:hover.disabled {\n  cursor: not-allowed;\n  color: #666\n}\n.json-schema-builder i:hover.model-comment {\n  cursor: auto\n}\n.json-schema-builder .js-row {\n  background: #f8faff;\n  border: 1px solid #dae2ea;\n  color: #7c9eb2;\n  padding: 0;\n  margin-bottom: 0.7rem;\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column\n}\n.json-schema-builder .js-row .information-bar {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  width: 100%;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between\n}\n.json-schema-builder .js-row .information-bar .title-group {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -webkit-box-flex: 1;\n  -ms-flex-positive: 1;\n  flex-grow: 1\n}\n.json-schema-builder .js-row .information-bar .title-group .obj-exp {\n  width: 50px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center\n}\n.json-schema-builder .js-row .type-selector.dropdown-menu.show {\n  display: inline-grid;\n  min-width: 0px\n}\n.json-schema-builder .js-row .model-icons {\n  -webkit-transition: all 0.2s ease-out;\n  transition: all 0.2s ease-out;\n  text-align: right;\n  background-color: #fff;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex\n}\n.json-schema-builder .js-row .model-icons .model-info {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  border: 1px solid #dae2ea;\n  border-right: 0;\n  border-top: 0;\n  border-bottom: 0;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: space-evenly;\n  -ms-flex-pack: space-evenly;\n  justify-content: space-evenly;\n  width: 150px\n}\n.json-schema-builder .js-row .model-icons .model-info .disabled {\n  opacity: 0.3\n}\n.json-schema-builder .js-row .model-icons .model-info .model-comment {\n  color: #7c9eb2\n}\n.json-schema-builder .js-row .model-icons .model-actions {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  border: 1px solid #dae2ea;\n  border-right: 0;\n  border-top: 0;\n  border-bottom: 0;\n  width: 60px;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: space-evenly;\n  -ms-flex-pack: space-evenly;\n  justify-content: space-evenly\n}\n.json-schema-builder .js-row .model-icons .model-actions .disabled {\n  opacity: 0.3\n}\n.json-schema-builder .js-row .model-icons .model-type {\n  opacity: 0.3\n}\n.json-schema-builder .js-row.t_bg {\n  opacity: 1;\n  color: #438eb9;\n  background: #f4f6f7;\n  border-color: #dce2e8;\n  -webkit-box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);\n  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);\n  color: #666\n}\n.json-schema-builder .js-row.t_bg .obj-exp {\n  color: #fff\n}\n.json-schema-builder .js-row.t_bg .model-title {\n  color: #fff\n}\n.json-schema-builder .js-row.t_bg .model-title:focus {\n  color: #666\n}\n.json-schema-builder .js-row.t_bg .model-icons {\n  right: 0\n}\n.json-schema-builder .js-row.t_bg .model-type {\n  opacity: 1 !important\n}\n.json-schema-builder .indent {\n  margin-left: 3.3rem;\n  position: relative\n}\n.json-schema-builder .array {\n  background-color: #009688 !important\n}\n.json-schema-builder .boolean {\n  background-color: #ff9800 !important\n}\n.json-schema-builder .integer {\n  background-color: #e91e63 !important\n}\n.json-schema-builder .number {\n  background-color: #e91e63 !important\n}\n.json-schema-builder .null {\n  background-color: #f44336 !important\n}\n.json-schema-builder .string {\n  background-color: #9c27b0 !important\n}\n.json-schema-builder .object {\n  background-color: #2196f3 !important\n}\n.json-schema-builder .unspecified {\n  background-color: #9e9e9e\n}\n.json-schema-builder .item-details {\n  direction: rtl\n}\n.json-schema-builder .item-details .model-det-cont {\n  direction: ltr;\n  background: #f5f5f5;\n  padding: 10px;\n  min-width: 450px\n}\n.json-schema-builder .item-details .enum-control-bar {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: end;\n  -ms-flex-align: end;\n  align-items: flex-end;\n  cursor: pointer\n}\n.json-schema-builder .item-details .enum-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center\n}\n.json-schema-builder .item-details .enum-row input {\n  height: 30px\n}\n.json-schema-builder form.model-detail-form .control-label {\n  padding: 0 5px\n}\n.json-schema-builder form.model-detail-form .detail-ip {\n  font-size: 13px;\n  background-color: #fff;\n  padding: 0 5px;\n  height: 25px;\n  color: #666\n}\n.json-schema-builder form.model-detail-form select.detail-ip {\n  padding-right: 20px\n}\n.json-schema-builder form.model-detail-form textarea {\n  font-size: 13px;\n  background: #fff;\n  padding: 0 5px\n}\n.json-schema-builder input.model-title {\n  color: #7c9eb2;\n  height: 40px;\n  width: 100%;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  border: none;\n  background: transparent;\n  outline: none\n}\n.json-schema-builder input.model-key:focus {\n  outline: none\n}\n.json-schema-builder input.model-key:active {\n  outline: none\n}"; }
}

class SchemaRowComponent {
    constructor() {
        this.showChildren = true;
        this.showDetailsPan = false;
        this._tickle = 0;
    }
    removeItem(item) {
        item.parent.removeChild(item._id);
    }
    addNewProp(item) {
        item.addChild();
    }
    rerender() {
        this._tickle++;
        this.parent.rerender();
    }
    render() {
        //Computed CSS Classes
        const rowClass = this.showDetailsPan ? 'js-row t_bg' : 'js-row';
        let requiredIconClass = this.item.isRequired ? 'fas fa-asterisk model-required text-danger' : 'fas fa-asterisk model-required';
        requiredIconClass += this.item.isRoot ? ' disabled' : '';
        const typeDisplayClass = 'badge badge-pill badge-primary ' + this.item.type;
        const descriptionIconClass = this.item.description ? 'fas fa-comment-alt model-comment pointer' : 'fas fa-comment-alt model-comment pointer disabled';
        const requiredTooltip = this.item.isRequired ? this.i18n.translate('json-schema-designer.required') : this.i18n.translate('json-schema-designer.not-required');
        //Handle Child Elements
        const objectItem = this.item;
        const propCountDisplay = objectItem.properties ? '(' + objectItem.getChildren().length + ')' : '(0)';
        let showChildrenElement;
        let children;
        if (objectItem.getChildren) {
            // Has Children
            if (this.showChildren) {
                showChildrenElement = h("i", { class: "t_color fas fa-chevron-down" });
                children = objectItem.getChildren();
            }
            else {
                showChildrenElement = h("i", { class: "t_color fas fa-chevron-right" });
                children = [];
            }
        }
        else {
            // No Children
            showChildrenElement = h("span", null);
            children = [];
        }
        return (h("div", null,
            h("div", { class: rowClass },
                h("div", { class: "information-bar" },
                    h("div", { class: "title-group" },
                        h("div", { class: "obj-exp", onClick: () => { this.showChildren = !this.showChildren; } }, showChildrenElement),
                        this.item.isDefinition
                            ? h("input", { class: "model-title", type: "text", value: this.item.definitionName, placeholder: "<Definition Name>", onInput: (event) => {
                                    let input = event.target;
                                    this.item.definitionName = input.value;
                                    this.rerender();
                                } })
                            : h("input", { class: "model-title", type: "text", value: this.item.title, placeholder: "<Title>", onInput: (event) => {
                                    let input = event.target;
                                    this.item.title = input.value;
                                    this.rerender();
                                } })),
                    h("div", { class: "model-icons" },
                        h("div", { class: "model-info" },
                            this.item.isRoot
                                ? h("select", { class: typeDisplayClass, onInput: (event) => {
                                        let input = event.target;
                                        this.item.changeType(input.value);
                                        this.rerender();
                                    } },
                                    h("option", { value: "object", class: "badge badge-pill badge-primary object" },
                                        " ",
                                        this.i18n.translate('json-schema-designer.object').toUpperCase(),
                                        " ",
                                        propCountDisplay))
                                : h("select", { class: typeDisplayClass, onInput: (event) => {
                                        let input = event.target;
                                        this.item.changeType(input.value);
                                        this.rerender();
                                    } },
                                    h("option", { value: "string", selected: this.item.type === 'string', class: "badge badge-pill badge-primar string" }, this.i18n.translate('json-schema-designer.string').toUpperCase()),
                                    h("option", { value: "number", selected: this.item.type === 'number', class: "badge badge-pill badge-primary number" }, this.i18n.translate('json-schema-designer.number').toUpperCase()),
                                    h("option", { value: "interger", selected: this.item.type === 'interger', class: "badge badge-pill badge-primary interger" }, this.i18n.translate('json-schema-designer.integer').toUpperCase()),
                                    h("option", { value: "object", selected: this.item.type === 'object', class: "badge badge-pill badge-primary object" },
                                        this.i18n.translate('json-schema-designer.object').toUpperCase(),
                                        " ",
                                        propCountDisplay),
                                    h("option", { value: "array", selected: this.item.type === 'array', class: "badge badge-pill badge-primary array" }, this.i18n.translate('json-schema-designer.array').toUpperCase()),
                                    h("option", { value: "boolean", selected: this.item.type === 'boolean', class: "badge badge-pill badge-primary boolean" }, this.i18n.translate('json-schema-designer.boolean').toUpperCase()),
                                    h("option", { value: "null", selected: this.item.type === 'null', class: "badge badge-pill badge-primary null" }, this.i18n.translate('json-schema-designer.null').toUpperCase()),
                                    h("option", { value: "$ref", selected: this.item.type === '$ref', class: "badge badge-pill badge-primary $ref" }, this.i18n.translate('json-schema-designer.$ref').toUpperCase())),
                            h("i", { class: requiredIconClass, "data-toggle": "tooltip", "data-placement": "top", "data-original-title": requiredTooltip, onClick: () => {
                                    if (this.item.isRoot)
                                        return;
                                    this.item.isRequired = !this.item.isRequired;
                                    this.rerender();
                                } }),
                            h("i", { class: descriptionIconClass, "data-toggle": "tooltip", "data-placement": "top", "data-original-title": this.item.description })),
                        h("div", { class: "model-actions" },
                            objectItem.getChildren
                                ? h("i", { class: "fas fa-plus obj-add", onClick: () => {
                                        this.addNewProp(objectItem);
                                        this.rerender();
                                    } })
                                : h("i", { class: "fas fa-plus obj-add disabled" }),
                            this.showDetailsPan
                                ? h("i", { class: "fas fa-check model-done text-success", onClick: () => { this.showDetailsPan = false; } })
                                : h("i", { class: "fas fa-pencil-alt model-detail", onClick: () => { this.showDetailsPan = true; } }),
                            this.item.isRoot
                                ? h("i", { class: "fas fa-times model-remove disabled" })
                                : h("i", { class: "fas fa-times model-remove", onClick: () => {
                                        if (this.item.isRoot)
                                            return;
                                        this.removeItem(this.item);
                                        this.rerender();
                                    } })))),
                this.showDetailsPan
                    ? h("item-details", { class: "item-details", item: this.item, parent: this })
                    : h("div", null)),
            h("div", { class: "indent" }, children.map((child) => h("schema-row", { item: child, parent: this })))));
    }
    static get is() { return "schema-row"; }
    static get properties() { return {
        "_tickle": {
            "state": true
        },
        "i18n": {
            "context": "i18n"
        },
        "item": {
            "type": "Any",
            "attr": "item"
        },
        "parent": {
            "type": "Any",
            "attr": "parent"
        },
        "showChildren": {
            "state": true
        },
        "showDetailsPan": {
            "state": true
        }
    }; }
}

export { ItemDetailsComponent as ItemDetails, DesignerComponent as JsonSchemaDesigner, SchemaRowComponent as SchemaRow };
