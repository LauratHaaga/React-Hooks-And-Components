/* eslint-disable no-console */
import { h, Fragment } from 'preact';
/*
    borderStyle: rounded | square | normal | custom 
    background: as long as the color is valid
    fontColor: as long as the color is valid --> hex | rgb | rgba | hsl
    components: expects an array of components --> React Component | String | Javascript DOM Elem
    cssFromStyle: expects a style object that refers to your scss file
    size: sm / md / xl
*/
function Label({
    borderStyle = 'rounded',
    background = 'lightBlue', 
    fontColor = 'white',
    size = 'sm',
    components = [],
    cssFromStyle = {},
}) {
    const getBorderStyleKey = ['rounded', 'square', 'normal'].includes(borderStyle) ? borderStyle : 'custom';
    
    const styleConfig = {
        rounded: {
            borderRadius: '1.56em',
        },
        square: {
            borderRadius: '0.3em',
        },
        normal: {
            borderRadius: 'none',
        },
        custom: {
            borderRadius: borderStyle,
        },
    };
    
    const inlineStyle = {
        ...styleConfig[getBorderStyleKey],
        background,
        color: fontColor,
        fontSize: 'inherit',
        padding: '0.4em 1em',
    };

    const Text = (Type, txtString, elemClass) => <Type className={cssFromStyle[elemClass]}>{txtString}</Type>;
    
    const getAttrFromString = (attr) => (str) => {
        const textRegex = /<(.*?)>/g;
        const valuesArray = str.split(textRegex).filter((string) => !!string);
        const attributes = valuesArray[0].replaceAll(' ', '');

        const attrFuncs = {
            class: () => attributes.split('.')[1],
            type: () => attributes.split('.')[0],
            content: () => valuesArray[1],
        };

        return attrFuncs[attr]();
    };

    function getElementProps(str) {
        const elemClass = getAttrFromString('class')(str);
        const type = getAttrFromString('type')(str);
        const content = getAttrFromString('content')(str);

        return [type, content, elemClass];
    }

    function handleComponent(component) {
        if (!component) return '';
        
        if (typeof component === 'string') return Text(...getElementProps(component));

        return (
            <Fragment>
                {component}
            </Fragment>
        );
    }

    return (
        <div className={cssFromStyle.label} style={inlineStyle}>
            { components.map(handleComponent) }
        </div>
    );
}

export default Label;
