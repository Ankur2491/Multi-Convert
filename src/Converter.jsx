import SplitPane from 'react-split-pane';
import './Converter.css';
import { Editor } from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import YAML from 'yaml';
import { toXML } from 'jstoxml';

export default function Converter({ fromType, toType }) {
    const [fromText, setFromText] = useState('');
    const [toText, setToText] = useState('');
    const fromRef = useRef(null);
    const toRef = useRef(null);
    function initializeTo(editor) {
        toRef.current = editor;
    }
    function initializeFrom(editor) {
        fromRef.current = editor;
    }
    const options = {
        selectOnLineNumbers: true
    };
    const xmlConfig = {
    indent: '    '
};
    useEffect(() => {
        if ((fromType == '' || toType == '') && (fromRef.current && toRef.current)) {
            fromRef.current.setValue('');
            toRef.current.setValue('');
        }
        else if(fromType !== '' && fromText !== '') {
            multiConvert(fromText);
        }
    }, [fromType, toType])

    return (
        <>
            <SplitPane split="vertical" defaultSize={500} primary='first'>
                <div>
                    <Editor height={'90vh'} language={fromType} theme='vs-dark' onChange={multiConvert} onMount={initializeFrom} />
                </div>
                <div>
                    <Editor height={'90vh'} language={toType} theme='vs-dark' onMount={initializeTo} />
                </div>
            </SplitPane>
        </>
    )

    function multiConvert(text) {
        setFromText(text);
        if (fromType == 'json') {
            if (toType == 'yaml') {
                toRef.current.setValue(YAML.stringify(JSON.parse(text)));
            }
            else if(toType == 'xml') {
                toRef.current.setValue(toXML(JSON.parse(text), xmlConfig));
            }
        }
        else if (fromType == 'yaml') {
            if (toType == 'json') {
                toRef.current.setValue(JSON.stringify(YAML.parse(text), null, '\t'));
            }
            else if(toType == 'xml') {
                toRef.current.setValue(toXML(YAML.parse(text), xmlConfig));
            }
            else if(toType == 'properties') {
                let arr = convertPropToYaml(YAML.parse(text));
                let s = "";
                for(let elem of arr) {
                    s = `${s}${elem}\n`;
                }
                toRef.current.setValue(s);
            }
        }
        else if (fromType == 'xml') {
            if(toType == 'yaml') {
                toRef.current.setValue(YAML.stringify(text));
            }
            if(toType == 'json') {
                toRef.current.setValue(JSON.stringify(YAML.parse(YAML.stringify(text)),null, '\t'));
            }
        }
        else if (fromType == 'properties') {
            if(toType == 'json') {
                toRef.current.setValue(JSON.stringify(propertiesToJSON(text), null, '\t'));
            }
            if(toType == 'yaml') {
                toRef.current.setValue(YAML.stringify(propertiesToJSON(text)));
            }
            if(toType == 'xml') {
                toRef.current.setValue(toXML(propertiesToJSON(text), xmlConfig));
            }
        }
    }

    function convertPropToYaml(json, prefix) {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function (key) {
        var _prefix;

        if (typeof json[ key ] === 'object') {
            var _currPrefix = key.concat('.');
            _prefix = prefix ? prefix.concat(_currPrefix) : _currPrefix;
            result = result.concat(convertPropToYaml(json[ key ], _prefix));
        } else {
            _prefix = prefix ? prefix.concat(key) : key;
            //added the following to replace arr.0.someting with arr[0].something
            _prefix = _prefix.replace(/\.([0-9]+)(?=\.|$)/g, '[$1]')
            result.push(_prefix.concat('=').concat(json[ key ]));
        }
    });

    return result;
}

function propertiesToJSON(str){
    return (
        str
            // Concat lines that end with '\'.
            .replace(/\\\n( )*/g, '')
            // Split by line breaks.
            .split('\n')
            // Remove commented lines:
            .filter((line) =>
                /(\#|\!)/.test(line.replace(/\s/g, '').slice(0, 1))
                    ? false
                    : line
            )
            // Create the JSON:
            .reduce((obj, line) => {
                // Replace only '=' that are not escaped with '\' to handle separator inside key
                const colonifiedLine = line.replace(/(?<!\\)=/, ':');
                const key = colonifiedLine
                    // Extract key from index 0 to first not escaped colon index
                    .substring(0, colonifiedLine.search(/(?<!\\):/))
                    // Remove not needed backslash from key
                    .replace(/\\/g, '')
                    .trim();
                const value = colonifiedLine
                    .substring(colonifiedLine.search(/(?<!\\):/) + 1)
                    .trim();
                obj[key] = value;
                return obj;
            }, {})
    );
};
} 