window.storyFormat({
  "name": "Example",
  "version": "0.0.9",
  "source": `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8">
    <title>{{STORY_NAME}}</title>
    <style>
      /* DEFAULT STYLING - Makes stories look good out of the box */
      body {
        margin: 0;
        padding: 20px;
        font-family: Georgia, serif;
        font-size: 18px;
        line-height: 1.6;
        color: #333;
        background-color: #f5f5f5;
      }
      
      /* Center the story content and limit width for readability */
      tw-passage {
        display: block;
        max-width: 700px;
        margin: 0 auto;
        padding: 40px;
        background: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        border-radius: 8px;
        /* FADE IN EFFECT - Passage appears smoothly */
        animation: fadeIn 0.4s ease-in;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      /* Style links to look clickable and elegant */
      a {
        color: #2c5aa0;
        text-decoration: none;
        border-bottom: 1px solid #2c5aa0;
        transition: all 0.2s ease;
      }
      
      a:hover {
        color: #1a3a6e;
        border-bottom-color: #1a3a6e;
        background-color: rgba(44, 90, 160, 0.05);
      }
      
      /* Make headings stand out */
      h1, h2, h3 {
        color: #1a1a1a;
        margin-top: 1.5em;
      }
      
      h1 { font-size: 2em; }
      h2 { font-size: 1.5em; }
      h3 { font-size: 1.2em; }
    </style>
  </head>
  <body>
    {{STORY_DATA}}
    <script>
      (function(window) {

        window.example = {};
        
        // NEW: Story variables storage object
        window.example.state = {
          variables: {}
        };

        // NEW: Helper function to get variable value
        window.example.getVar = function(varName) {
          // Remove $ prefix if present
          varName = varName.replace(/^\\$/, '');
          return example.state.variables[varName];
        }

        // NEW: Helper function to set variable value
        window.example.setVar = function(varName, value) {
          // Remove $ prefix if present
          varName = varName.replace(/^\\$/, '');
          example.state.variables[varName] = value;
        }

        // NEW: Helper function to delete variable
        window.example.unsetVar = function(varName) {
          // Remove $ prefix if present
          varName = varName.replace(/^\\$/, '');
          delete example.state.variables[varName];
        }

        // NEW: Function to evaluate expressions with story variables
        window.example.evalExpression = function(expr) {
          // Replace $varname with example.getVar('varname')
          let processedExpr = expr.replace(/\\$(\\w+)/g, function(match, varName) {
            return \`example.getVar('\\${varName}')\`;
          });
          
          try {
            return eval(processedExpr);
          } catch(e) {
            console.error('Error evaluating expression:', expr, e);
            return undefined;
          }
        }
        
        window.example.parse = function parse(result) {

          // Convert HTML entities first
          result = result.replace(/&lt;/g, function (match, target) {
            return "<";
          });

          result = result.replace(/&gt;/g, function (match, target) {
            return ">";
          });

          // NEW: Handle <<set>> macro AFTER entity conversion
          result = result.replace(/<<set\\s+(.+?)>>/g, function(match, expression) {
            expression = expression.trim();
            
            // Check for compound assignment operators (+=, -=, *=, /=, etc.)
            let compoundMatch = expression.match(/^\\$(\\w+)\\\\s*([+\\-*/%])=\\\\s*(.+)$/);
            if (compoundMatch) {
              let varName = compoundMatch[1];
              let operator = compoundMatch[2];
              let rightSide = compoundMatch[3];
              
              let currentValue = example.getVar(varName);
              let incrementValue = example.evalExpression(rightSide);
              
              let newValue;
              switch(operator) {
                case '+': newValue = currentValue + incrementValue; break;
                case '-': newValue = currentValue - incrementValue; break;
                case '*': newValue = currentValue * incrementValue; break;
                case '/': newValue = currentValue / incrementValue; break;
                case '%': newValue = currentValue % incrementValue; break;
              }
              
              example.setVar(varName, newValue);
              return ''; // Remove the macro from output
            }
            
            // Check for regular assignment (=)
            let assignMatch = expression.match(/^\\$(\\w+)\\\\s*=\\\\s*(.+)$/);
            if (assignMatch) {
              let varName = assignMatch[1];
              let valueExpr = assignMatch[2];
              
              // Evaluate the right side expression
              let value = example.evalExpression(valueExpr);
              
              example.setVar(varName, value);
              return ''; // Remove the macro from output
            }
            
            console.warn('Invalid <<set>> syntax:', expression);
            return ''; // Remove invalid macro
          });

          // NEW: Handle <<unset>> macro
          result = result.replace(/<<unset\\\\s+(.+?)>>/g, function(match, varList) {
            // Split by comma and trim each variable name
            let vars = varList.split(',').map(v => v.trim());
            
            vars.forEach(varName => {
              example.unsetVar(varName);
            });
            
            return ''; // Remove the macro from output
          });

          // NEW: Handle variable printing $varname
          result = result.replace(/\\$(\\w+)/g, function(match, varName) {
            let value = example.getVar(varName);
            return value !== undefined ? value : match;
          });

          result = result.replace(/<script>((?:.|\\n)*?)<\\/script>/g, function(match, target) {
            eval(target);
            return "";
          });

          result = result.replace(/<include>(.*?)<\\/include>/g, function(match, target) {
            let passage = example.findPassageByName(target);
            let result = "";

            if(passage !== null) {
              result = example.parse(passage.innerHTML)
            }

            return result;
          });

          result = result.replace(/\\_\\_(.*?)\\_\\_/g, function (match, target) {
            return \`<em>\${target}</em>\`;
          });

          result = result.replace(/\\*\\*(.*?)\\*\\*/g, function (match, target) {
            return \`<strong>\${target}</strong>\`;
          });

          result = result.replace(/\\[\\[(.*?)\\]\\]/g, function (match, target) {
            var display = target;
            var barIndex = target.indexOf('|');

            if (barIndex !== -1) {
              display = target.substr(0, barIndex);
              target = target.substr(barIndex + 1);
            } else {
              var rightArrIndex = target.indexOf('->');

              if (rightArrIndex !== -1) {
                display = target.substr(0, rightArrIndex);
                target = target.substr(rightArrIndex + 2);
              } else {
                var leftArrIndex = target.indexOf('<-');

                if (leftArrIndex !== -1) {
                  display = target.substr(leftArrIndex + 2);
                  target = target.substr(0, leftArrIndex);
                }
              }
            }

            return '<a href="javascript:void(0)" data-passage="' +
                   target + '">' + display + '</a>';
          });

          return result;
        }

        window.example.findPassageByPid = function findPassageByPid(pid) {
          return document.querySelector(\`[pid="\${pid}"]\`);
        }

        window.example.findPassageByName = function findPassageByName(name) {
          return document.querySelector(\`[name="\${name}"]\`);
        }

        window.example.showPassage = function showPassage(passagedata) {

          let passage = document.querySelector('tw-passage');

          if(passage === null) {
            passage = document.createElement('tw-passage');
          }

          let passageContents = passagedata.innerHTML;
          passageContents = example.parse(passageContents);
          passage.innerHTML = passageContents;

          let links = passage.querySelectorAll('a[data-passage]');

          for(let link of links) {
            link.addEventListener('click', function() {
              let passagename = this.attributes["data-passage"].value;
              let passagedata = example.findPassageByName(passagename);
              example.showPassage(passagedata);
            });
          }

          let passagesContainer = document.querySelector('#passages');
          if(passagesContainer) {
            passagesContainer.innerHTML = '';
            passagesContainer.appendChild(passage);
          } else {
            document.body.appendChild(passage);
          }
        }

        window.example.setupInterface = function setupInterface() {
          let interfacePassage = example.findPassageByName('StoryInterface');
          
          if(interfacePassage !== null) {
            let interfaceHTML = interfacePassage.innerHTML;
            interfaceHTML = example.parse(interfaceHTML);
            
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = interfaceHTML;
            
            while(tempDiv.firstChild) {
              document.body.appendChild(tempDiv.firstChild);
            }
          }
        }

        let storydata = document.querySelector('tw-storydata');

        let startnode = storydata.attributes['startnode'].value;
        let passagedata = window.example.findPassageByPid(startnode);
        
        let stylesheet = storydata.querySelector('style');
        if(stylesheet !== null) {
          let newStyle = stylesheet.cloneNode(true);
          newStyle.setAttribute('type', 'text/css');
          document.head.appendChild(newStyle);
        }

        example.setupInterface();
        example.showPassage(passagedata);

      }(window))
    </script>
  </body>
</html>`,
  "description": "An example story format with variable support"
});