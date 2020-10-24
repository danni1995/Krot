import {TOOL_BUCKET, TOOL_COLORWHEEL, TOOL_DOTS, TOOL_ERASER, TOOL_EYEDROP, TOOL_PEN, TOOL_SHAPES, TOOL_SHAPES_CIRCLE, TOOL_SHAPES_RECTANGLE, TOOL_SHAPES_TRIANGLE, TOOL_TEXT} from './tool.js';
import Paint from './paint.class.js';

var paint = new Paint("my-canvas");


/* Here we select all the tools by finding them in the html with "[data-tool]".
Then we add an event listener "click" to select each tool */
document.querySelectorAll("[data-tool]").forEach(
    item => {
        item.addEventListener("click", e =>{

            document.querySelector("[data-tool].clicked").classList.toggle("clicked"); // remove the class "clicked" from last used tool
            item.classList.toggle("clicked"); // Adds the class "clicked"

            let = selectedTool = item.getAttribute("data-tool");

            switch (selectedTool) { // if the tool that is selected is tool_shapes then the triangle, circle and rectangle tools will pop up.
                case tool.TOOL_SHAPES:
                    document.querySelector(".shapes-wrapper").style.display = "block";
                    break;
            default:
                document.querySelector(".shapes-wrapper").style.display = "none";
            }

        });
    }
);

