import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-rust';
import 'ace-builds/src-noconflict/mode-kotlin';

import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-eclipse';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/theme-tomorrow_night_blue';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-ambiance';
import 'ace-builds/src-noconflict/theme-solarized_light';


import 'ace-builds/src-noconflict/ext-language_tools.js';

export default function Editor({
	language,
    theme,
    body,
    setBody,
    height,
    readOnly,
    width,
    fontSize
}) {

	const languageToEditor = {
		'python': 'python',
		'c': 'c_cpp',
		'cpp': 'c_cpp',
		'java': 'java',
		'rust': 'rust',
		'javascript': 'javascript',
		'kotlin': 'kotlin'
	}

	return (
		<div>
			<AceEditor
				mode={languageToEditor[language]}
				theme={theme}
				value={body}
				width={width ? width : '100%'}
				height={height ? height : '100vh'}
				readOnly={readOnly ? readOnly : false}
				fontSize={fontSize ? (isNaN(+fontSize) ? 12 : +fontSize) : 12}
				name="Editor"
				showGutter={true}
				editorProps={{ $blockScrolling: true }}
				setOptions={{
					enableBasicAutocompletion: true,
					enableLiveAutocompletion: true,
					enableSnippets: true
				}}
				onChange={(value) => setBody(value)}
			></AceEditor>
		</div>
	)
}