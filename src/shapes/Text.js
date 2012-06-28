///////////////////////////////////////////////////////////////////////
//  Text
///////////////////////////////////////////////////////////////////////
/**
 * Text constructor
 * @constructor
 * @augments Kinetic.Group
 * @param {Object} config
 */
Kinetic.Text = function(config) {
    this.setDefaultAttrs({
        fontFamily: 'Calibri',
        text: '',
        fontSize: 12,
        align: 'left',
        verticalAlign: 'top',
        fontStyle: 'normal',
        padding: 0,
        width: 'auto',
        height: 'auto',
        detectionType: 'path',
        cornerRadius: 0
    });

    this.shapeType = "Text";
    this.boxShape = new Kinetic.Rect({});

    var that = this;

    this.textShape = new Kinetic.Shape({
        drawFunc: function() {
            var context = this.getContext();

            // sync appliedShadow flag with boxShape
            this.appliedShadow = that.boxShape.appliedShadow;

            context.font = that.attrs.fontStyle + ' ' + that.attrs.fontSize + 'pt ' + that.attrs.fontFamily;
            context.textBaseline = 'middle';
            context.textAlign = 'left';
            context.save();

            var p = that.attrs.padding;

            context.beginPath();
            context.rect(p / 2, p / 2, that.getBoxWidth() - p, that.getBoxHeight() - p);
            context.closePath();

            if(that.attrs.width !== 'auto' && (that.getTextWidth() > that.getBoxWidth() - p || that.getTextHeight() > that.getBoxHeight() - p)) {
                context.clip();
            }

            // horizontal align
            if(that.attrs.align === 'left') {
                context.translate(p / 2, 0);
            }
            else if(that.attrs.align === 'center') {
                context.translate((that.getBoxWidth() - that.getTextWidth()) / 2, 0);
            }
            // right
            else {
                context.translate(that.getBoxWidth() - that.getTextWidth() - p / 2, 0);
            }

            // vertical align
            if(that.attrs.verticalAlign === 'top') {
                context.translate(0, (p + that.getTextHeight()) / 2);
            }
            else if(that.attrs.verticalAlign === 'middle') {
                context.translate(0, that.getBoxHeight() / 2);
            }
            // bottom
            else {
                context.translate(0, that.getBoxHeight() - (p + that.getTextHeight()) / 2);
            }

            this.fillText(that.attrs.text);
            this.strokeText(that.attrs.text);
            context.restore();
        }
    });

    // call super constructor
    Kinetic.Group.apply(this, [config]);

    // add shapes to group
    this.add(this.boxShape);
    this.add(this.textShape);

    // bind events to sync attrs
    var attrs = ['width', 'height', 'cornerRadius', 'stroke', 'strokeWidth', 'fill', 'shadow', 'detectionType', 'textFill', 'textStroke', 'textStrokeWidth'];

    for(var n = 0; n < attrs.length; n++) {
        var attr = attrs[n];
        this.on(attr + 'Change', this._syncAttrs);
    }

    this._syncAttrs();
};
/*
 * Text methods
 */
Kinetic.Text.prototype = {
    /**
     * get text width in pixels
     */
    getTextWidth: function() {
        return this.getTextSize().width;
    },
    /**
     * get text height in pixels
     */
    getTextHeight: function() {
        return this.getTextSize().height;
    },
    /**
     * get text size in pixels
     */
    getTextSize: function() {
        var dummyCanvas = document.createElement('canvas');
        var context = dummyCanvas.getContext('2d');

        context.save();
        context.font = this.attrs.fontStyle + ' ' + this.attrs.fontSize + 'pt ' + this.attrs.fontFamily;
        var metrics = context.measureText(this.attrs.text);
        context.restore();
        return {
            width: metrics.width,
            height: parseInt(this.attrs.fontSize, 10)
        };
    },
    /**
     * get box width
     */
    getBoxWidth: function() {
        return (this.attrs.width === 'auto' ? this.getTextWidth() : this.attrs.width) + this.attrs.padding;
    },
    /**
     * get box height
     */
    getBoxHeight: function() {
        return (this.attrs.height === 'auto' ? this.getTextHeight() : this.attrs.height) + this.attrs.padding;
    },
    _syncAttrs: function() {
        this.boxShape.setAttrs({
            width: this.getBoxWidth(),
            height: this.getBoxHeight(),
            cornerRadius: this.attrs.cornerRadius,
            stroke: this.attrs.stroke,
            strokeWidth: this.attrs.strokeWidth,
            fill: this.attrs.fill,
            shadow: this.attrs.shadow,
            detectionType: this.attrs.detectionType
        }, true);
        /*
         * sync attrs accessed by fillText and strokeText
         * in Shape class, and also the detectionType
         */
        this.textShape.setAttrs({
            textFill: this.attrs.textFill,
            textStroke: this.attrs.textStroke,
            textStrokeWidth: this.attrs.textStrokeWidth,
            shadow: this.attrs.shadow,
            detectionType: this.attrs.detectionType
        }, true);
    }
};
// extend Shape
Kinetic.GlobalObject.extend(Kinetic.Text, Kinetic.Group);

// add setters and getters
Kinetic.GlobalObject.addSettersGetters(Kinetic.Text, ['fontFamily', 'fontSize', 'fontStyle', 'textFill', 'textStroke', 'textStrokeWidth', 'padding', 'align', 'verticalAlign', 'text', 'width', 'height', 'cornerRadius', 'fill', 'stroke', 'strokeWidth', 'shadow']);

/**
 * set font family
 * @name setFontFamily
 * @methodOf Kinetic.Text.prototype
 * @param {String} fontFamily
 */

/**
 * set font size
 * @name setFontSize
 * @methodOf Kinetic.Text.prototype
 * @param {int} fontSize
 */

/**
 * set font style.  Can be "normal", "italic", or "bold".  "normal" is the default.
 * @name setFontStyle
 * @methodOf Kinetic.Text.prototype
 * @param {String} fontStyle
 */

/**
 * set text fill color
 * @name setTextFill
 * @methodOf Kinetic.Text.prototype
 * @param {String} textFill
 */

/**
 * set text stroke color
 * @name setFontStroke
 * @methodOf Kinetic.Text.prototype
 * @param {String} textStroke
 */

/**
 * set text stroke width
 * @name setTextStrokeWidth
 * @methodOf Kinetic.Text.prototype
 * @param {int} textStrokeWidth
 */

/**
 * set padding
 * @name setPadding
 * @methodOf Kinetic.Text.prototype
 * @param {int} padding
 */

/**
 * set horizontal align of text
 * @name setAlign
 * @methodOf Kinetic.Text.prototype
 * @param {String} align align can be 'left', 'center', or 'right'
 */

/**
 * set vertical align of text
 * @name setVerticalAlign
 * @methodOf Kinetic.Text.prototype
 * @param {String} verticalAlign verticalAlign can be "top", "middle", or "bottom"
 */

/**
 * set text
 * @name setText
 * @methodOf Kinetic.Text.prototype
 * @param {String} text
 */

/**
 * set width of text box
 * @name setWidth
 * @methodOf Kinetic.Text.prototype
 * @param {Number} width
 */

/**
 * set height of text box
 * @name setHeight
 * @methodOf Kinetic.Text.prototype
 * @param {Number} height
 */

/**
 * set shadow of text or textbox
 * @name setShadow
 * @methodOf Kinetic.Text.prototype
 * @param {Object} config
 */

/**
 * get font family
 * @name getFontFamily
 * @methodOf Kinetic.Text.prototype
 */

/**
 * get font size
 * @name getFontSize
 * @methodOf Kinetic.Text.prototype
 */

/**
 * get font style
 * @name getFontStyle
 * @methodOf Kinetic.Text.prototype
 */

/**
 * get text fill color
 * @name getTextFill
 * @methodOf Kinetic.Text.prototype
 */

/**
 * get text stroke color
 * @name getTextStroke
 * @methodOf Kinetic.Text.prototype
 */

/**
 * get text stroke width
 * @name getTextStrokeWidth
 * @methodOf Kinetic.Text.prototype
 */

/**
 * get padding
 * @name getPadding
 * @methodOf Kinetic.Text.prototype
 */

/**
 * get horizontal align
 * @name getAlign
 * @methodOf Kinetic.Text.prototype
 */

/**
 * get vertical align
 * @name getVerticalAlign
 * @methodOf Kinetic.Text.prototype
 */

/**
 * get text
 * @name getText
 * @methodOf Kinetic.Text.prototype
 */

/**
 * get width of text box
 * @name getWidth
 * @methodOf Kinetic.Text.prototype
 */

/**
 * get height of text box
 * @name getHeight
 * @methodOf Kinetic.Text.prototype
 */

/**
 * get shadow of text or textbox
 * @name getShadow
 * @methodOf Kinetic.Text.prototype
 */