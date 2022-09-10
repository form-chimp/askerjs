import ChoiceInput from "./components/form/ChoiceInput.js";
import FileUpload from "./components/form/file-upload.js";
import InfoScreen from "./components/form/Info-screen.js";
import Input from "./components/form/Input.js";
import MultiChoiceInput from "./components/form/multiChoiceInput.js";
import Textarea from "./components/form/Textarea.js";

export default [

    {
        type:'info',
        constructor: InfoScreen,
    },

    {
        type: 'text',
        constructor: Input,
    },

    {
        type: 'singleChoice',
        constructor: ChoiceInput,
    },

    {
        type: 'multiChoice',
        constructor: MultiChoiceInput,
    },

    {
        type: 'paragraph',
        constructor: Textarea,
    },

    {
        type: 'file',
        constructor: FileUpload,
    }

]