window.storyFormat({
  "name": "Example",
  "version": "0.1.15",
  "source": `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8">
    <title>{{STORY_NAME}}</title>
    <style>
      body {
        margin: 0;
        padding: 20px;
        padding-left: 280px;
        font-family: Georgia, serif;
        font-size: 18px;
        line-height: 1.6;
        color: #333;
        background-color: #f5f5f5;
        transition: padding-left 0.3s ease;
      }
      
      body.sidebar-stowed {
        padding-left: 20px;
      }
      
      tw-passage {
        display: block;
        max-width: 700px;
        margin: 0 auto;
        padding: 40px;
        background: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        border-radius: 8px;
        animation: fadeIn 0.4s ease-in;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
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
      
      h1, h2, h3 {
        color: #1a1a1a;
        margin-top: 1.5em;
      }
      
      h1 { font-size: 2em; }
      h2 { font-size: 1.5em; }
      h3 { font-size: 1.2em; }

      /* SIDEBAR STYLES */
      #ui-bar {
        position: fixed;
        left: 0;
        top: 0;
        width: 250px;
        height: 100vh;
        background: #2a2a2a;
        color: #fff;
        padding: 15px;
        box-shadow: 2px 0 10px rgba(0,0,0,0.3);
        transition: transform 0.3s ease;
        z-index: 1000;
        overflow-y: auto;
      }
      
      #ui-bar.stowed {
        transform: translateX(-250px);
      }
      
      #ui-bar-toggle {
        position: fixed;
        top: 10px;
        left: 250px;
        width: 35px;
        height: 35px;
        background: #2a2a2a;
        border: none;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        border-radius: 0 4px 4px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: left 0.3s ease;
        z-index: 1001;
      }
      
      #ui-bar-toggle:hover {
        background: #3a3a3a;
      }
      
      body.sidebar-stowed #ui-bar-toggle {
        left: 0;
      }
      
      
      #ui-bar h1 {
        font-size: 1.3em;
        margin: 0 0 20px 0;
        color: #fff;
      }
      
      .ui-bar-button {
        display: block;
        width: 100%;
        padding: 12px;
        margin: 8px 0;
        background: #3a3a3a;
        border: none;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        border-radius: 4px;
        transition: background 0.2s;
      }
      
      .ui-bar-button:hover {
        background: #4a4a4a;
      }
      
      /* MODAL STYLES */
      .modal-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        z-index: 2000;
        align-items: center;
        justify-content: center;
      }
      
      .modal-overlay.active {
        display: flex;
      }
      
      .modal {
        background: white;
        border-radius: 8px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
      }
      
      .modal-header {
        padding: 20px;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .modal-header h2 {
        margin: 0;
        color: #333;
        font-size: 1.5em;
      }
      
      .modal-close {
        background: none;
        border: none;
        font-size: 28px;
        cursor: pointer;
        color: #666;
        padding: 0;
        width: 30px;
        height: 30px;
        line-height: 1;
      }
      
      .modal-close:hover {
        color: #000;
      }
      
      .modal-body {
        padding: 20px;
      }
      
      .save-slot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
        margin: 10px 0;
        background: #f5f5f5;
        border-radius: 4px;
        border: 1px solid #ddd;
      }
      
      .save-slot.empty {
        background: #fafafa;
      }
      
      .save-info {
        flex: 1;
      }
      
      .save-info .save-title {
        font-weight: bold;
        color: #333;
      }
      
      .save-info .save-details {
        font-size: 0.9em;
        color: #666;
        margin-top: 4px;
      }
      
      .save-actions {
        display: flex;
        gap: 8px;
      }
      
      .btn {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
      }
      
      .btn-primary {
        background: #2c5aa0;
        color: white;
      }
      
      .btn-primary:hover {
        background: #1a3a6e;
      }
      
      .btn-danger {
        background: #d9534f;
        color: white;
      }
      
      .btn-danger:hover {
        background: #c9302c;
      }
      
      .btn-secondary {
        background: #6c757d;
        color: white;
      }
      
      .btn-secondary:hover {
        background: #5a6268;
      }
      
      .modal-footer {
        padding: 20px;
        border-top: 1px solid #ddd;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }
      
      .modal-footer .btn {
        flex: 1;
        min-width: 150px;
      }

      /* TEXTBOX STYLES */
      .story-textbox {
        padding: 8px 12px;
        font-size: 16px;
        border: 2px solid #ddd;
        border-radius: 4px;
        font-family: Georgia, serif;
        transition: border-color 0.2s;
        min-width: 200px;
      }

      .story-textbox:focus {
        outline: none;
        border-color: #2c5aa0;
      }
    </style>
  </head>
  <body>
    {{STORY_DATA}}
    <!-- Sidebar -->
    <button id="ui-bar-toggle" title="Toggle Sidebar">&gt;</button>
    <div id="ui-bar">
      <h1>{{STORY_NAME}}</h1>
      <button class="ui-bar-button" onclick="window.UIBar.showSaves()">💾 Saves</button>
    </div>
    
    <!-- Save Modal -->
    <div id="save-modal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2>Save & Load</h2>
          <button class="modal-close" onclick="window.UIBar.closeSaves()">&times;</button>
        </div>
        <div class="modal-body" id="save-slots">
          <!-- Save slots will be generated here -->
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="window.SaveSystem.saveToFile()">💾 Save to Disk</button>
          <button class="btn btn-secondary" onclick="window.SaveSystem.loadFromFile()">📂 Load from Disk</button>
          <button class="btn btn-danger" onclick="window.SaveSystem.deleteAll()">🗑️ Delete All</button>
        </div>
      </div>
    </div>
    
    <input type="file" id="load-file-input" style="display: none" accept=".json">
    <script>
      (function(window) {
        console.log('Story format loaded - v0.1.1');

        window.example = {};
        
        window.example.variables = {};
        window.example.visits = {};
        window.example.currentPassage = null;

        window.example.set = function(name, value) {
          example.variables[name] = value;
        }
        
        window.example.get = function(name) {
          return example.variables[name];
        }
        
        window.example.unset = function(name) {
          delete example.variables[name];
        }
        
        window.example.trackVisit = function(passageName) {
          if (!example.visits[passageName]) {
            example.visits[passageName] = 0;
          }
          example.visits[passageName]++;
        }
        
        window.example.visited = function(passageName) {
          return example.visits[passageName] || 0;
        }
        
        window.example.random = function(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        window.example.evaluateCondition = function(varName, operator, value) {
          let varValue = example.get(varName);
          let compareValue = value.trim();
          
          // Check if compareValue is itself a variable (starts with $)
          if (compareValue.startsWith('$')) {
            compareValue = example.get(compareValue.substring(1));
          }
          // Otherwise parse as before
          else if ((compareValue.startsWith('"') && compareValue.endsWith('"')) || 
              (compareValue.startsWith("'") && compareValue.endsWith("'"))) {
            compareValue = compareValue.slice(1, -1);
          } else if (compareValue === 'true') {
            compareValue = true;
          } else if (compareValue === 'false') {
            compareValue = false;
          } else if (!isNaN(compareValue)) {
            compareValue = Number(compareValue);
          }
          switch(operator) {
            case 'is':
              return varValue == compareValue;
            case 'is not':
              return varValue != compareValue;
            case '>':
              return Number(varValue) > Number(compareValue);
            case '<':
              return Number(varValue) < Number(compareValue);
            case '>=':
              return Number(varValue) >= Number(compareValue);
            case '<=':
              return Number(varValue) <= Number(compareValue);
          }
          return false;
        }
        
        window.example.parse = function parse(result) {
          console.log('=== PARSE START ===');
          
          // Convert HTML entities first
          result = result.replace(/&lt;/g, "<");
          result = result.replace(/&gt;/g, ">");
          result = result.replace(/&amp;/g, "&");
          result = result.replace(/&quot;/g, '"');
          result = result.replace(/&#39;/g, "'");

          // Process script tags
          result = result.replace(/<script>([\\s\\S]*?)<\\/script>/g, function(match, target) {
            eval(target);
            return "";
          });

          // Process include tags
          result = result.replace(/<include>(.*?)<\\/include>/g, function(match, target) {
            let passage = example.findPassageByName(target);
            let result = "";
            if(passage !== null) {
              result = example.parse(passage.innerHTML)
            }
            return result;
          });

          // Sequential processing loop
          let changed = true;
          let maxIterations = 100;
          let iterations = 0;
          
          while (changed && iterations < maxIterations) {
            changed = false;
            iterations++;
            
            let firstCommandPos = -1;
            let firstCommandType = null;
            let firstCommandMatch = null;
            
            // Check for {random}
            let randomMatch = result.match(/\\{random \\$(\\w+) from (\\d+) to (\\d+)\\}/);
            if (randomMatch && (firstCommandPos === -1 || result.indexOf(randomMatch[0]) < firstCommandPos)) {
              firstCommandPos = result.indexOf(randomMatch[0]);
              firstCommandType = 'random';
              firstCommandMatch = randomMatch;
            }
            
            // Check for {set}
            let setMatch = result.match(/\\{set \\$(\\w+) to ([^}]+)\\}/);
            if (setMatch && (firstCommandPos === -1 || result.indexOf(setMatch[0]) < firstCommandPos)) {
              firstCommandPos = result.indexOf(setMatch[0]);
              firstCommandType = 'set';
              firstCommandMatch = setMatch;
            }
            
            // Check for {unset}
            let unsetMatch = result.match(/\\{unset \\$(\\w+)\\}/);
            if (unsetMatch && (firstCommandPos === -1 || result.indexOf(unsetMatch[0]) < firstCommandPos)) {
              firstCommandPos = result.indexOf(unsetMatch[0]);
              firstCommandType = 'unset';
              firstCommandMatch = unsetMatch;
            }
            
            // Check for {if} (variable conditional)
            let ifMatch = result.match(/\\{if \\$(\\w+) (is not|is|>=|<=|>|<) (.*?)\\}([\\s\\S]*?)\\{endif\\}/);
            if (ifMatch && (firstCommandPos === -1 || result.indexOf(ifMatch[0]) < firstCommandPos)) {
              firstCommandPos = result.indexOf(ifMatch[0]);
              firstCommandType = 'if';
              firstCommandMatch = ifMatch;
            }
            
            // Check for {if visited}
            let visitedIfMatch = result.match(/\\{if visited "(.*?)" (is not|is|>=|<=|>|<) (\\d+)\\}([\\s\\S]*?)\\{endif\\}/);
            if (visitedIfMatch && (firstCommandPos === -1 || result.indexOf(visitedIfMatch[0]) < firstCommandPos)) {
              firstCommandPos = result.indexOf(visitedIfMatch[0]);
              firstCommandType = 'visited-if';
              firstCommandMatch = visitedIfMatch;
            }
            
            // Check for {textbox}
            let textboxMatch = result.match(/\\{textbox \\$(\\w+) "(.*?)"\\}/);
            if (textboxMatch && (firstCommandPos === -1 || result.indexOf(textboxMatch[0]) < firstCommandPos)) {
              firstCommandPos = result.indexOf(textboxMatch[0]);
              firstCommandType = 'textbox';
              firstCommandMatch = textboxMatch;
            }

            // Process the first command we found
            if (firstCommandType === 'random') {
              let varName = firstCommandMatch[1];
              let min = Number(firstCommandMatch[2]);
              let max = Number(firstCommandMatch[3]);
              let randomValue = example.random(min, max);
              example.set(varName, randomValue);
              console.log('SET', varName, '=', randomValue);
              result = result.replace(firstCommandMatch[0], '');
              changed = true;
            }
            else if (firstCommandType === 'set') {
              let varName = firstCommandMatch[1];
              let value = firstCommandMatch[2];
              let evalValue;
              
              try {
                if ((value.startsWith('"') && value.endsWith('"')) || 
                    (value.startsWith("'") && value.endsWith("'"))) {
                  evalValue = value.slice(1, -1);
                } 
                else if (value === 'true') {
                  evalValue = true;
                } else if (value === 'false') {
                  evalValue = false;
                }
                else if (/[+\\-*\\/()$]/.test(value)) {
                  let expression = value.replace(/\\$(\\w+)/g, function(m, v) {
                    let varValue = example.get(v);
                    return varValue !== undefined ? varValue : 0;
                  });
                  evalValue = eval(expression);
                }
                else if (!isNaN(value)) {
                  evalValue = Number(value);
                }
                else {
                  evalValue = value;
                }
              } catch(e) {
                evalValue = value;
              }
              
              example.set(varName, evalValue);
              console.log('SET', varName, '=', evalValue);
              result = result.replace(firstCommandMatch[0], '');
              changed = true;
            }
            else if (firstCommandType === 'unset') {
              let varName = firstCommandMatch[1];
              example.unset(varName);
              result = result.replace(firstCommandMatch[0], '');
              changed = true;
            }
            else if (firstCommandType === 'if') {
              let varName = firstCommandMatch[1];
              let operator = firstCommandMatch[2];
              let value = firstCommandMatch[3];
              let content = firstCommandMatch[4];
              
              console.log('IF:', varName, '('+example.get(varName)+')', operator, value);
              
              // Parse branches
              let branches = [];
              let currentBranch = {type: 'if', content: '', varName: varName, operator: operator, value: value};
              let depth = 0;
              let i = 0;
              
              while (i < content.length) {
                let remaining = content.substr(i);
                
                if (remaining.startsWith('{if ')) {
                  depth++;
                  currentBranch.content += content[i];
                  i++;
                }
                else if (remaining.startsWith('{endif}')) {
                  if (depth > 0) {
                    depth--;
                    currentBranch.content += content.substr(i, 7);
                    i += 7;
                  } else {
                    break;
                  }
                }
                else if (remaining.startsWith('{elseif ') && depth === 0) {
                  branches.push(currentBranch);
                  let condEnd = content.indexOf('}', i);
                  let condStr = content.substring(i + 8, condEnd);
                  let condMatch = condStr.match(/\\$(\\w+) (is not|is|>=|<=|>|<) (.+)/);
                  if (condMatch) {
                    currentBranch = {
                      type: 'elseif', 
                      content: '', 
                      varName: condMatch[1], 
                      operator: condMatch[2], 
                      value: condMatch[3].trim()
                    };
                  }
                  i = condEnd + 1;
                }
                else if (remaining.startsWith('{else}') && depth === 0) {
                  branches.push(currentBranch);
                  currentBranch = {type: 'else', content: ''};
                  i += 6;
                }
                else {
                  currentBranch.content += content[i];
                  i++;
                }
              }
              
              branches.push(currentBranch);
              console.log('Branches:', branches.length);
              
              // Evaluate and pick winner
              let winningContent = '';
              for (let branch of branches) {
                if (branch.type === 'if' || branch.type === 'elseif') {
                  let conditionMet = example.evaluateCondition(branch.varName, branch.operator, branch.value);
                  console.log('  ', branch.type, branch.varName, '('+example.get(branch.varName)+')', branch.operator, branch.value, '=', conditionMet);
                  if (conditionMet) {
                    winningContent = branch.content;
                    console.log('  WINNER!');
                    break;
                  }
                } else if (branch.type === 'else') {
                  winningContent = branch.content;
                  console.log('  Using else');
                  break;
                }
              }
              
              result = result.replace(firstCommandMatch[0], winningContent);
              changed = true;
            }
            else if (firstCommandType === 'visited-if') {
              let passageName = firstCommandMatch[1];
              let operator = firstCommandMatch[2];
              let value = Number(firstCommandMatch[3]);
              let content = firstCommandMatch[4];
              
              console.log('IF VISITED:', passageName, '('+example.visited(passageName)+')', operator, value);
              
              // Parse branches similar to regular if statements
              let branches = [];
              let currentBranch = {type: 'if', content: '', passageName: passageName, operator: operator, value: value};
              let depth = 0;
              let i = 0;
              
              while (i < content.length) {
                let remaining = content.substr(i);
                
                if (remaining.startsWith('{if ')) {
                  depth++;
                  currentBranch.content += content[i];
                  i++;
                }
                else if (remaining.startsWith('{endif}')) {
                  if (depth > 0) {
                    depth--;
                    currentBranch.content += content.substr(i, 7);
                    i += 7;
                  } else {
                    break;
                  }
                }
                else if (remaining.startsWith('{elseif visited ') && depth === 0) {
                  branches.push(currentBranch);
                  // Extract: {elseif visited "PassageName" operator value}
                  let condEnd = content.indexOf('}', i);
                  let condStr = content.substring(i + 16, condEnd);
                  let condMatch = condStr.match(/"(.*?)" (is not|is|>=|<=|>|<) (\\d+)/);
                  if (condMatch) {
                    currentBranch = {
                      type: 'elseif', 
                      content: '', 
                      passageName: condMatch[1], 
                      operator: condMatch[2], 
                      value: Number(condMatch[3])
                    };
                  }
                  i = condEnd + 1;
                }
                else if (remaining.startsWith('{else}') && depth === 0) {
                  branches.push(currentBranch);
                  currentBranch = {type: 'else', content: ''};
                  i += 6;
                }
                else {
                  currentBranch.content += content[i];
                  i++;
                }
              }
              
              branches.push(currentBranch);
              console.log('Visited Branches:', branches.length);
              
              // Evaluate and pick winner
              let winningContent = '';
              for (let branch of branches) {
                if (branch.type === 'if' || branch.type === 'elseif') {
                  let visitCount = example.visited(branch.passageName);
                  let condition = false;
                  
                  switch(branch.operator) {
                    case 'is': condition = visitCount == branch.value; break;
                    case 'is not': condition = visitCount != branch.value; break;
                    case '>': condition = visitCount > branch.value; break;
                    case '<': condition = visitCount < branch.value; break;
                    case '>=': condition = visitCount >= branch.value; break;
                    case '<=': condition = visitCount <= branch.value; break;
                  }
                  
                  console.log('  ', branch.type, 'visited', branch.passageName, '('+visitCount+')', branch.operator, branch.value, '=', condition);
                  
                  if (condition) {
                    winningContent = branch.content;
                    console.log('  WINNER!');
                    break;
                  }
                } else if (branch.type === 'else') {
                  winningContent = branch.content;
                  console.log('  Using else');
                  break;
                }
              }
              

              result = result.replace(firstCommandMatch[0], winningContent);
              changed = true;
            }
            
             else if (firstCommandType === 'textbox') {
              let varName = firstCommandMatch[1];
              let defaultValue = firstCommandMatch[2];
              
              // Get current value or use default
              let currentValue = example.get(varName) || defaultValue;
              
              // Create unique ID for this textbox
              let textboxId = 'textbox_' + varName + '_' + Math.random().toString(36).substr(2, 9);
              
              // Create the textbox HTML (escaped properly)
              let textboxHTML = '<input type="text" class="story-textbox" id="' + textboxId + '" value="' + currentValue + '" data-variable="' + varName + '">';
              
              result = result.replace(firstCommandMatch[0], textboxHTML);
              changed = true;
            }
          }
          //while loop closes here


          // Display commands
          result = result.replace(/\\{visited "(.*?)"\\}/g, function(match, passageName) {
            return example.visited(passageName);
          });

          result = result.replace(/\\{\\$(\\w+)\\}/g, function(match, varName) {
            let value = example.get(varName);
            return value !== undefined ? value : '';
          });

          // Formatting
          result = result.replace(/__(.*?)__/g, function (match, target) {
            return \`<em>\${target}</em>\`;
          });

          result = result.replace(/\\*\\*(.*?)\\*\\*/g, function (match, target) {
            return \`<strong>\${target}</strong>\`;
          });

          // Links
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

            return '<a href="javascript:void(0)" data-passage="' + target + '">' + display + '</a>';
          });

          console.log('=== PARSE END ===');
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

          let passageName = passagedata.attributes['name'].value;
          example.currentPassage = passageName;
          example.trackVisit(passageName);

          let passageContents = passagedata.innerHTML;
          passageContents = example.parse(passageContents);
          passage.innerHTML = passageContents;

          // Add event listeners for textboxes
          let textboxes = passage.querySelectorAll('.story-textbox');
          for(let textbox of textboxes) {
            // Update variable on input
            textbox.addEventListener('input', function() {
              let varName = this.getAttribute('data-variable');
              example.set(varName, this.value);
              console.log('TEXTBOX SET', varName, '=', this.value);
            });
          }

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

        // UIBAR SYSTEM
        window.UIBar = {
          stow: function() {
            document.getElementById('ui-bar').classList.add('stowed');
            document.body.classList.add('sidebar-stowed');
            document.getElementById('ui-bar-toggle').innerHTML = '&lt;';
          },
          
          unstow: function() {
            document.getElementById('ui-bar').classList.remove('stowed');
            document.body.classList.remove('sidebar-stowed');
            document.getElementById('ui-bar-toggle').innerHTML = '&gt;';
          },
          
          toggle: function() {
            if (document.getElementById('ui-bar').classList.contains('stowed')) {
              this.unstow();
            } else {
              this.stow();
            }
          },
          
          showSaves: function() {
            window.SaveSystem.refreshSlots();
            document.getElementById('save-modal').classList.add('active');
          },
          
          closeSaves: function() {
            document.getElementById('save-modal').classList.remove('active');
          }
        };
        
        // Setup toggle button
        document.getElementById('ui-bar-toggle').addEventListener('click', function() {
          window.UIBar.toggle();
        });
        
        // Close modal when clicking outside
        document.getElementById('save-modal').addEventListener('click', function(e) {
          if (e.target === this) {
            window.UIBar.closeSaves();
          }
        });
        // SAVE SYSTEM
        window.SaveSystem = {
          SAVE_PREFIX: 'twine_save_',
          SLOT_COUNT: 8,
          
          createSaveData: function() {
            return {
              variables: example.variables,
              visits: example.visits,
              currentPassage: example.currentPassage,
              timestamp: Date.now(),
              date: new Date().toLocaleString()
            };
          },
          
          save: function(slotNumber) {
            let saveData = this.createSaveData();
            localStorage.setItem(this.SAVE_PREFIX + slotNumber, JSON.stringify(saveData));
            console.log('Saved to slot', slotNumber);
            this.refreshSlots();
          },
          
          load: function(slotNumber) {
            let saveDataStr = localStorage.getItem(this.SAVE_PREFIX + slotNumber);
            if (!saveDataStr) {
              alert('No save found in this slot!');
              return;
            }
            
            try {
              let saveData = JSON.parse(saveDataStr);
              example.variables = saveData.variables || {};
              example.visits = saveData.visits || {};
              
              // Navigate to saved passage
              if (saveData.currentPassage) {
                let passageData = example.findPassageByName(saveData.currentPassage);
                if (passageData) {
                  example.showPassage(passageData);
                }
              }
              
              console.log('Loaded from slot', slotNumber);
              window.UIBar.closeSaves();
            } catch(e) {
              alert('Error loading save: ' + e.message);
            }
          },
          
          deleteSave: function(slotNumber) {
            if (confirm('Delete this save?')) {
              localStorage.removeItem(this.SAVE_PREFIX + slotNumber);
              this.refreshSlots();
            }
          },
          
          deleteAll: function() {
            if (confirm('Delete ALL saves? This cannot be undone!')) {
              for (let i = 1; i <= this.SLOT_COUNT; i++) {
                localStorage.removeItem(this.SAVE_PREFIX + i);
              }
              this.refreshSlots();
            }
          },
          
          saveToFile: function() {
            let saveData = this.createSaveData();
            let blob = new Blob([JSON.stringify(saveData, null, 2)], { type: 'application/json' });
            let url = URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = 'twine_save_' + Date.now() + '.json';
            a.click();
            URL.revokeObjectURL(url);
          },
          
          loadFromFile: function() {
            let input = document.getElementById('load-file-input');
            input.onchange = function(e) {
              let file = e.target.files[0];
              if (!file) return;
              
              let reader = new FileReader();
              reader.onload = function(e) {
                try {
                  let saveData = JSON.parse(e.target.result);
                  example.variables = saveData.variables || {};
                  example.visits = saveData.visits || {};
                  
                  if (saveData.currentPassage) {
                    let passageData = example.findPassageByName(saveData.currentPassage);
                    if (passageData) {
                      example.showPassage(passageData);
                    }
                  }
                  
                  window.UIBar.closeSaves();
                  alert('Save loaded successfully!');
                } catch(err) {
                  alert('Error loading file: ' + err.message);
                }
              };
              reader.readAsText(file);
            };
            input.click();
          },
          
          refreshSlots: function() {
            let container = document.getElementById('save-slots');
            container.innerHTML = '';
            
            for (let i = 1; i <= this.SLOT_COUNT; i++) {
              let saveDataStr = localStorage.getItem(this.SAVE_PREFIX + i);
              let slot = document.createElement('div');
              slot.className = 'save-slot';
              
              if (saveDataStr) {
                try {
                  let saveData = JSON.parse(saveDataStr);
                  slot.innerHTML = \`
                    <div class="save-info">
                      <div class="save-title">Slot \${i}: \${saveData.currentPassage || 'Unknown'}</div>
                      <div class="save-details">\${saveData.date || 'No date'}</div>
                    </div>
                    <div class="save-actions">
                      <button class="btn btn-primary" onclick="window.SaveSystem.load(\${i})">Load</button>
                      <button class="btn btn-primary" onclick="window.SaveSystem.save(\${i})">Overwrite</button>
                      <button class="btn btn-danger" onclick="window.SaveSystem.deleteSave(\${i})">Delete</button>
                    </div>
                  \`;
                } catch(e) {
                  slot.className = 'save-slot empty';
                  slot.innerHTML = \`
                    <div class="save-info">
                      <div class="save-title">Slot \${i}: Empty</div>
                    </div>
                    <div class="save-actions">
                      <button class="btn btn-primary" onclick="window.SaveSystem.save(\${i})">Save Here</button>
                    </div>
                  \`;
                }
              } else {
                slot.className = 'save-slot empty';
                slot.innerHTML = \`
                  <div class="save-info">
                    <div class="save-title">Slot \${i}: Empty</div>
                  </div>
                  <div class="save-actions">
                    <button class="btn btn-primary" onclick="window.SaveSystem.save(\${i})">Save Here</button>
                  </div>
                \`;
              }
              
              container.appendChild(slot);
            }
          }
        };
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
  "description": "An example story format"
});