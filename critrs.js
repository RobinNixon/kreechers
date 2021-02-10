"use strict"                                                                    // Critrs (c) 2021 Robin Nixon

const VERSION     = "0.9b03",                                                   // This version
      DIDCOPY     = "The following code has been copied to the clipboard. "   + // Used if copying to the keyboard buffer succeeded...
                    "Paste it into the 'presets.js' file to save the "        +
                    "current settings as a new preset.\n\n",
      NOTCOPY     = " Could not copy the below to the clipboard, so "         + // ... or failed
                    "manually type it into the 'presets.js' file to save "    +
                    "the current settings as a new preset.\n\n",
      MUTATEDELAY = 15,                                                         // Delay in seconds between mutations
      FPSBUFSIZE  = 200,                                                        // Size of frame counter buffer
      MAXWIDTH    = 2600,                                                       // Should fit most monitor widths
      MAXHEIGHT   = 700                                                         // No need for more height than this

let div        = Math.floor,                                                    // Shortened name for a frequently used function
    DIDPRESET  = true,                                                          // Flags that start off true
    GUIDE      = true,
    DISPLAY    = true,
    MUTATE     = false,                                                         // Flags that start off false
    SHOWN      = false,
    LIMIT      = false,
    LCLICK     = false,
    RCLICK     = false,
    STEP       = false,
    SHIFT      = false,
    EDITMODE   = false,
    MONO       = false,
    TRACK      = false,
    HARDB      = false,
    VARYLIFE   = false,
    MULTIPASS  = false,
    STEPFLAG   = false,
    MOUSEX     = 0,                                                             // Globals initialized to 0
    MOUSEY     = 0,
    EDITX      = 0,
    EDITY      = 0,
    PAGEX      = 0,
    PAGEY      = 0,
    PRESET     = 0,
    MUTATECT   = 0,
    OFFSETX    = 0,
    OFFSETY    = 0,
    TOP        = 0,
    ROTIMEOUT  = 0,
    GUIDECT    = 0,
    LEFT       = 0,
    CRITRTYPE  = 0,
    GUIDERATE  = 10,
    RSLTN      = 1,                                                             // 1 = highest, 9 = lowest - start at 1 for setup...
    CONTROL    = {},
    CANVW      = Math.min(MAXWIDTH,  window.innerWidth  - 32),
    CANVH      = Math.min(MAXHEIGHT, window.innerHeight - 12),
    BWIDTH     = CANVW,                                                         // Allow for scrollbar
    BHEIGHT    = CANVH,                                                         // Leave room for canvas bottom in res of less than 640
    WORLD      = createArray(MAXWIDTH, MAXHEIGHT),                              // The game world
    WORLD2     = createArray(MAXWIDTH, MAXHEIGHT),                              // A copy of the world for various uses
    ZOOMCT     = 100,                                                           // Number of zoom levels
    ZOOMLEV    = 100,                                                           // Current zoom level
    MODEX      = BWIDTH  / ZOOMCT,                                              // The Dimensiopns of the current zoom level
    MODEY      = BHEIGHT / ZOOMCT,
    WIDTH      = BWIDTH,                                                        // Width of current zoom
    HEIGHT     = BHEIGHT,                                                       // Height of current zoom
    SCALEX     = BWIDTH  / WIDTH,                                               // Scale factor for zoom level
    SCALEY     = BHEIGHT / HEIGHT,
    LEN1       = 2,                                                              // Matrix width and height
    LEN2       = 2,
    RULES      = createArray(9, 9, 4),                                          // Matrix of up to 9 x 9
    OLDFPS     = 30,                                                             // Quick restore after pause or edit
    FPS        = 30,                                                            // Frame counter
    FPSA       = Array(FPSBUFSIZE).fill(FPS),                                   // FPS diplay smoothing array
    MUTATED    = new Object(),                                                  // Details about mutations
    MT         = MUTATEDELAY + 1,                                               // Counter for mutation delays
    TIME       = new Date().getTime(),                                          // The time now
    LENX       = div(LEN1 / 2),                                                 // Half the dimensions of the matrix
    LENY       = div(LEN2 / 2),                                                 // Use for selecting the matrixes most central 2x2 section
    LENX1      = LIMIT ? LENX : 0,                                              // Only used if LIMIT is true
    LENY1      = LIMIT ? LENY : 0,
    VLIFEB     = [0, 0, 1, 0, 0, 0, 0, 0],
    VLIFED     = [1, 1, 0, 0, 1, 1, 1, 1],
    CONTEXT    = canvas.getContext('2d', { alpha: false }),                     // A context into the canvas
    CANV       = canvas,                                                        // A pointer to the canvas
    TGUIDE     = ''

document.addEventListener("DOMContentLoaded", init)                             // Only start when ready

function init()                                                                 // Prepare everything
{
  CONTROL.s = false
  CONTROL.f = false

  setupCanvas()                                                                 // Ready the canvas
  clearWorld()                                                                  // Empty the WORLD
  setRes(5)                                                                     // Select a medium resolution
  newPreset()                                                                   // Load in the first preset from presets.js

  setTimeout(mainLoop, 0)                                                       // Jump to the loop at next available cycle
}

function mainLoop()                                                             // Where it all happens
{
  let j = 0,
      k = 0

  const timenow = new Date().getTime(),                                         // Use to track frame rate
        l = (1000 / (timenow - TIME)) | 0

  if (!STEPFLAG && !EDITMODE)                                                   // If not editing or stepping
  {
    updateWorld()                                                               // Process the world
    STEPFLAG = STEP                                                             // If stepping, reset the flag
  }

  drawWorld()                                                                   // We are editing or stepping so just draw the world
                                                                                // Because we may be modifying it
  if (EDITMODE)
  {
     editCursor()                                                               // Creates a new cursor for editing and tracks it
  }

  if (LCLICK || RCLICK)
  {
    editParticles()                                                             // Act on mouse clicks
  }

  if (MUTATE)
  {
     mutateRule()                                                               // Mutate arule if mutating is on
  }

  if (DISPLAY)
  {
    showInfo()                                                                  // SHow the information and controls display
  }

  while (j < (FPSBUFSIZE - 1))                                                  // Keep a buffer of framerates
  {                                                                             // to smooth the changes and shjow the average
    k      += FPSA[j      ]                                                     // over recent time
    FPSA[j] = FPSA[j++ + 1]
  }

  if (STEP || EDITMODE)
  {
    FPSA[FPSBUFSIZE - 1] = OLDFPS                                               // Add current FPS to buffer
  }
  else
  {
    FPSA[FPSBUFSIZE - 1] = l
  }

  FPS    = div((k + l) / FPSBUFSIZE)                                            // Calculate the average
  OLDFPS = FPS                                                                  // Keep a copy for restoring after pausing
  TIME   = timenow                                                              // What's the time now?

  setTimeout(mainLoop, 0)                                                       // We're done - go around again

  function editParticles()                                                      // These functions are within mainLoop() as this is
  {                                                                             // the only place they are called - keeps things clear
    if (CONTROL.s)                                                              // and the scope tidy
    {
      if (!CONTROL.f)
      {
        if (LCLICK && RCLICK)
        {
          CONTROL.f = 3
        }
        else if (LCLICK)
        {
          CONTROL.f = 1
        }
        else if (RCLICK)
        {
          CONTROL.f = 2
        }

        CONTROL.x1 = MOUSEX + LEFT
        CONTROL.y1 = MOUSEY + TOP
      }
      
      CONTROL.x2 = MOUSEX + LEFT
      CONTROL.y2 = MOUSEY + TOP
    }
    else
    {
      WORLD[MOUSEX + LEFT][MOUSEY + TOP] = LCLICK ? 1 : 0
    }                                                                           // This simply sets or restes a location

    ifStep(0)                                                                   // Update the world etc if stepping
  }

  function mutateRule()                                                         // Called if mutatation is enabled
  {
    let x, y, p, q, n

    if (STEPFLAG)
    {
      return                                                                    // Not while stepping
    }
    else if (MUTATECT++ < (FPS + 1) * MUTATEDELAY)
    {
      return                                                                    // wait for the count to be ready...
    }

    MUTATECT  = 0
    MT        = MUTATEDELAY + 1
    DIDPRESET = false

    while (true)                                                                // Randomly select 2 swap locations for a rule
    {
      x = randInt(LEN1)
      y = randInt(LEN2)
      p = LIMIT ? randInt(Math.min(LEN2, 2)) : randInt(LEN2)
      q = LIMIT ? randInt(Math.min(LEN1, 2)) : randInt(LEN1)
      n = randInt(2) * 2

      if (!(RULES[x][y][n    ] == p &&                                          // Keep going until they are different
            RULES[x][y][n + 1] == q))
      {
        MUTATED.f = true
        MUTATED.x = x
        MUTATED.y = y
        MUTATED.p = p
        MUTATED.q = q
        MUTATED.r = RULES[x][y][n * 2    ]
        MUTATED.s = RULES[x][y][n * 2 + 1]

        setRule(x, y, p, q, n, 1)                                               // Change the rule
        break
      }
    }
  }

  function showInfo()                                                           // The information and control panel
  {
    let j, k,
        s = ''

    if (SHOWN)
    {
      return updateControls()                                                   // Already created, only the controls etc need updating
    }

    s += "<table style='border:1px solid #00f; margin:5px; background:#004; " +
         "opacity:80%'><tr><td><table style='border:none' width=320>"

    s += "<tr><th colspan=2 style='height:20px; background:#008; color:#8f8;" +
         "border:1px solid #008; font-size:16px; text-align:center'><b>"      +
         "CRITRS v" + VERSION + " &copy; 2021 by <a href=http://robinnixon."  +
         "com>Robin Nixon</a></b>&nbsp;</span></th></tr><tr><th colspan=2>"   +
         "</th></tr>"

    s += "<tr><td width=50%>Zoom Level</td><td align=right data-title='If "   +
         "you are not sure how far in or out your are zoomed, ensure the "    +
         "guide window is on and refer to it'><span id=i0>&nbsp;</span>"      +
         "</td></tr>"

    s += "<tr><td>Current Preset</td><td align=right data-title='These "      +
         "presets are in the presets.js file - you can change them or add "   +
         "your own if you download this program'><span id=i1>&nbsp;</span>"   +
         "</td></tr>"

    s += "<tr><td>Frame Rate</td><td align=right data-title='If the frame "   +
         "rate is slow try decreasing resolution, zooming in, or decreasing " +
         "particles'><span id=i3>&nbsp;</span></td></tr>"

    if (CRITRTYPE == 1)
    {
      s += "</tr><tr><th colspan=2></th></tr>"

      s += "<tr><td style='color:#99f'><i>Original Game of Life Rules:"       +
           "</i></td><td align=right style='color:#99f'><i><span style='"     +
           "color:#9f9'>3</span> &nbsp; &amp; &nbsp; <span style='color:"     +
           "#f99'>1, 4, 5, 6, 7, 8&nbsp;</span></i></th></tr>"

      s += "<tr><td>Create new particle if any of these numbers of "          +
           "neighbors:</td><td align=right><span style='padding-right:3px; "  +
           "color:#9f9'><div class=checknum>1</div><div class=checknum>2"     +
           "</div><div class=checknum>3</div><div class=checknum>4</div>"     +
           "<div class=checknum>5</div><div class=checknum>6</div><div "      +
           "class=checknum>7</div><div class=checknum>8</div></span><br>"

      for (j = 1 ; j < 9 ; ++j)
      {
        s += "<input type=checkbox " + (VLIFEB[j - 1] ? "checked " : "")      +
             "onclick='VLIFEB[" + (j - 1) + "] ^= 1; SHOWN = false'>"
      }

      s += "</span></td></tr>"

      s += "<tr><td>Remove particle if any of these numbers of neighbors:"    +
           "</td><td align=right><span style='padding-right:3px; color:#f99'" +
           "><div class=checknum>1</div><div class=checknum>2</div><div clas" +
           "s=checknum>3</div><div class=checknum>4</div><div class=checknum" +
           ">5</div><div class=checknum>6</div><div class=checknum>7</div>"   +
           "<div class=checknum>8</div></span><br>"

      for (j = 1 ; j < 9 ; ++j)
      {
        s += "<input type=checkbox " + (VLIFED[j - 1] ? "checked " : "")      +
             "onclick='VLIFED [" + (j - 1) + "] ^= 1; SHOWN = false'>"
      }

      s += "</span></td></tr>"
      s += "</tr><tr><th colspan=2></th></tr>"

      s += "<tr><td>Change Resolution &nbsp;<span class=keys><u>&lt;</u>"     +
           " &hellip; <u>&gt;</u></span></td><td data-title='Changing to a "  +
           "lower resolution (to the right) substantially increases the "     +
           "animation frame rate, while higher resolutions (to the left) "    +
           "offer much more detail, at the expense of speed' align=right>"    +
           "<input oninput='setRes(parseInt(this.value))' type=range min=1 "  +
           "max=9 value=" + RSLTN + "></td></tr>"
    }

    s += "</tr><tr><th colspan=2></th></tr>"

    s += "<tr ><td><u>G</u>uide Window</td><td data-title='Hides &amp; "      +
         "displays the bottom-left window - when the frame rate is slow, "    +
         "hiding the guide can improve animation speed' align=right><label "  +
         "class=switch><input onclick='setGuide()' type=checkbox " + (GUIDE   ?
         "checked" : "") + "><span class='slider round'></span></label>"      +
         "</td></tr>"

    s += "<tr><td><u>T</u>oggle Color / Monochrome</td><td data-title='"      +
         "Choose between colored or monochrome particles' align=right><label" +
         " class=switch><input onclick='monoColor()' type=checkbox "          +
         (MONO ? "checked" : "") + "><span class='slider round'></span>"      +
         "</label></td></tr>"

    s += "<tr><td><u>P</u>ause (then <u>S</u> to Step)</td><td data-title='"  +
         "Select Pause then use the S key to step through animation frame by" +
         " frame' align=right><label class=switch><input onclick='setStep()'" +
         " type=checkbox " + (STEP ? "checked" : "") + "><span class='slider" +
         " round'></span></label></td></tr>"

    s += "<tr><th colspan=2></th></tr>"

    if (CRITRTYPE == 0)
    {
      s += "<tr><td>Allow <u>M</u>utation</td><td data-title='Mutation "      +
           "causes one random change of a rule in a rule set every 15 "       +
           "seconds' align=right><label class=switch><input onclick='"        +
           "setMutate()' type=checkbox " + (MUTATE ? "checked" : "") + ">"    +
           "<span class='slider round'></span></label></td></tr>"

      s += "<tr><td><u>U</u>se a 2&times;2 Matrix</td><td data-title='"       +
           "Applying rules of larger matrixes to just a 2x2 section incre"    +
           "ases speed and perceived order' align=right><label class=switch>" +
           "<input onclick='setLimit()' type=checkbox "                       +
           (LIMIT ? "checked" : "") + "><span class='slider round'></span>"   +
           "</label></td></tr>"

      s += "<tr><td><u>H</u>ard Borders</td><td data-title='"                 +
           "By default the world is wrap-around, but you can see some very "  +
           "interesting effects with a hard border, such as sand and gravity" +
           "-like effects - when enabled, try adding more particles using "   +
           "filled rectangles' align=right><label class=switch><input "       +
           "onclick='setHardborder()' type=checkbox " + (HARDB ? "checked"    :
           "") + "><span class='slider round'></span></label></td></tr>"

      s += "<tr><td><u>E</u>nable Multiple Passes</td><td data-title='"       +
           "Sometimes strange glitch effects occur when one application of "  +
           "rules clashes with the subsequent rule set application - by "     +
           "using multiple, staggered passes, this effect is diminished' "    +
           "align=right><label class=switch><input onclick='setMultipass()' " +
           "type=checkbox " + (MULTIPASS ? "checked" : "") + "><span class='" +
           "slider round'></span></label></td></tr>"

      s += "<tr><td>Track <u>I</u>nvisible Particles</td><td data-title='"    +
           "Some particles move a greater distance than the matrix dimen"     +
           "sions each frame, and may not be seen until they collide with "   +
           "another - with this option you can see their trails as a series " +
           "of small dots - mainly applicable to single passes' align=right>" +
           "<label class=switch><input onclick='trackChange()' type="         +
           "checkbox " + (TRACK ? "checked" : "") + "><span class='slider "   +
           "round'></span></label></td></tr>"

      s += "<tr><th colspan=2></th></tr>"

      s += "<tr><td>Change Resolution &nbsp;<span class=keys><u>&lt;</u>"     +
           " &hellip; <u>&gt;</u></span></td><td data-title='Changing to a "  +
           "lower resolution (to the right) substantially increases the "     +
           "animation frame rate, while higher resolutions (to the left) "    +
           "offer much more detail, at the expense of speed' align=right>"    +
           "<input oninput='setRes(parseInt(this.value))' type=range min=1 "  +
           "max=9 value=" + RSLTN + "></td></tr>"

      s += "<tr><td>Columns: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "      +
           "&nbsp; &nbsp; <span class=keys><u>1</u> &hellip; <u>9</u></span>" +
           "</td><td align=right data-title='More columns brings more comp"   +
           "lexity'><input oninput='LEN1=parseInt(this.value); setRules()' "  +
           "type=range min=1 max=9 value=" + LEN1 + "></td></tr>"

      s += "<tr><td>Rows: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"   +
           "<span class=keys><u>Shift</u>-<u>1</u> &hellip; <u>9</u></span>"  +
           "</td><td align=right data-title='More rows increases complexity'" +
           "><input oninput='LEN2=parseInt(this.value); setRules()' type="    +
           "range min=1 max=9 value=" + LEN2 + "></td></tr>"

      s += "<tr><th colspan=2></th></tr>"

      s += "<tr><td><span id=i2a>Next Mutation</span><td align=right data-"   +
           "title='When mutation is on a random rule change is automatically" +
           "applied every 15 seconds'><span id=i2b>&nbsp;</span></td></tr>"

      s += "<tr><td>Matrix Dimensions</td><td align=right data-title='The "   +
           "width and height of the rule matrix'><span id=i4>&nbsp;</span>"   +
           "</td></tr>"

      s += "<tr><td>Number of Cells</td><td align=right data-title='The "     +
           "total number of cells in the rule matrix'><span id=i5>&nbsp;"     +
           "</span></td></tr>"

      s += "<tr><td>Available Rules per Cell</td><td align=right data-title=" +
           "'The number of different possible combinations of rules per "     +
           "matrix cell'><span id=i6>&nbsp;</span></td></tr>"

      s += "<tr><td>Possible Combinations</td><td align=right data-title="    +
           "'The grand total number of possible variations of rules for "     +
           "this matrix'><span id=i7>nbsp;<sup>&nbsp;</sup></span></td></tr>"

      s += "<tr><th colspan=2></th></tr>"

      s += "<tr><td colspan=2><button onclick='playLife()' style='width:"     +
           "100%'>This is CRITRS - Play The Game of Life</button></td></tr>"
    }
    else if (CRITRTYPE == 1)
    {
      s += "</tr><tr><th colspan=2></th></tr>"

      s += "<tr><td colspan=2><button onclick='playCritrs()' style='width:"   +
           "100%'>This is The Game of Life - Play CRITRS</button></td></tr>"
    }

    s += "<tr><td align=middle><button data-title='Draws a random line of "   +
         "particles in the current view - you can manually draw a line any"   +
         "where you want by holding down Ctrl, left-clicking, dragging and "  +
         "releasing the mouse' onclick='randomLine()' style='width:100%'>"    +
         "Random <u>L</u>ine</button></td>"

    if (CRITRTYPE == 0)
    {
      s += "<td align=middle><button data-title='Creates a new random set "   +
           "of rules for this matrix configuration - Tips: Draw with the "    +
           "mouse or add lines &amp; rectangles for interesting results; "    +
           "Click or double click in the rules matrix to change rules' "      +
           "onclick='setRules()' style='width:100%'><u>N</u>ew Random "       +
           "Ruleset</button></td></tr>"
    }
    else
    {
      s += "<td align=middle><button data-title='Creates a new random set "   +
           "of rules for the Game of Life - Tips: Draw with the mouse or "    +
           "add lines &amp; rectangles for interesting results - or use the " +
           "checkboxes above to modify them yourself' onclick='setRules()' "  +
           "style='width:100%'><u>N</u>ew Random Ruleset</button></td></tr>"
    }

    s += "<tr><td align=middle><button data-title='Draws a random open "      +
         "rectangle of particles in the current view - you can manually "     +
         "draw an open rectangle anywhere you want by holding down Ctrl, "    +
         "right-clicking, dragging and releasing the mouse' onclick='random"  +
         "OpenRectangle()' style='width:100%'>Random <u>O</u>pen Rect."       +
         "</button></td><td align=middle><button data-title='Draws a random " +
         "filled rectangle of particles in the current view - you can "       +
         "manually draw a filled rectangle anywhere you want by holding "     +
         "down Ctrl and both mouse buttons, dragging and releasing the mouse" +
         "' onclick='randomFilledRectangle()' style='width:100%'>Random "     +
         "<u>F</u>illed Rect.</button></td></tr>"

    s += "<tr><td align=middle><button data-title='Loads the next ready-"     +
         "made configuration of particles and rules into the current view' "  +
         "onclick='newPreset()' style='width:100%'><u>A</u>pply Next Preset"  +
         "</button></td><td align=middle><button data-title='Removes all "    +
         "particles from the world' onclick='clearWorld()' style='width:"     +
         "100%'><u>C</u>lear All Particles</button></td></tr>"

    s += "<tr><td align=middle><button data-title='Fills the current view "   +
         "with particles spelling the word Critrs' onclick='writeCritrs()' "  +
         "style='width:100%'><u>W</u>rite 'Critrs'</td><td align=middle>"     +
         "<button data-title='Copies the current rule set and particle "      +
         "locations into the keyboard buffer for pasting into the presets."   +
         "js file - Replace the data string at the end with a pair of "       +
         "quotes to just save the rule set' onclick='makeCode()' style='"     +
         "width:100%'>Copy Preset to <u>K</u>bd.</td></tr>"

    s += "<tr><td align=middle><button onclick='doEditmode()' data-title='"   +
         "Tips: You can also enter Edit Mode by Shift-Clicking in the "       +
         "window; Hold down Shift while editing to pan &amp zoom; Right "     +
         "click erases; Esc restores previous settings' style='width:100%"    +
         (EDITMODE ? ";background:#800'><i>Edit Mode - <i>Esc to Exit</i>"    :
         ";background:#080'><i>Enter Edit Mode") + "</i></td><td align="      +
         "middle><button data-title='Hides this display &ndash; press D to "  +
         "restore - Tip: Use a mouse scroll wheel or touchpad to zoom in "    +
         "and out, and the mouse to pan' onclick='setInfo()' style='width:"   +
         "100%'>Hide/Restore <u>D</u>isplay</td></tr>"

    s += "</table></td></tr></table>"

    output2.innerHTML = s                                                       // Writes into the DIV
    SHOWN             = true                                                    // Prevent the sliders etc being redrawn every frame
  }
}

function updateWorld()                                                          // Choose which game to play
{
  if (CRITRTYPE == 0)
  {
    updateCritrs()
  }

  if (CRITRTYPE == 1)
  {
    updateLife()
  }
}

function updateLife()                                                           // Conway's Game of Life
{
  let j, y, m, n, t,
      x = 0

  while (x < BWIDTH)                                                            // For these large arrays 'while' has tested a few
  {                                                                             // percent faster than 'for', that's more FPS!
    y = 0

    WORLD2[x].fill(0)

    while (y < BHEIGHT)
    {
      n = (WORLD[wrapX(x - 1)][wrapY(y - 1)] ? 1 : 0) +                         // Count the neighbors
          (WORLD[      x     ][wrapY(y - 1)] ? 1 : 0) +
          (WORLD[wrapX(x + 1)][wrapY(y - 1)] ? 1 : 0) +
          (WORLD[wrapX(x - 1)][      y     ] ? 1 : 0) +
          (WORLD[wrapX(x + 1)][      y     ] ? 1 : 0) +
          (WORLD[wrapX(x - 1)][wrapY(y + 1)] ? 1 : 0) +
          (WORLD[      x     ][wrapY(y + 1)] ? 1 : 0) +
          (WORLD[wrapX(x + 1)][wrapY(y + 1)] ? 1 : 0)

      m = WORLD[x][y]                                                           // Is the current cell occupied?

      if      ( m && !VLIFED[n - 1])
      {                                                                         // If not in these bounds a particle 'dies'
        WORLD2[x][y] = m + .05                                                 // A small value to cycle colors slower
      }
      else if (!m &&  VLIFEB[n - 1])                                            // The cell is unoccupied and...
      {
        WORLD2[x][y] = 1                                                        // There are the correct number of neighbors
      }                                                                         // so a new particle is 'born'
      y++                                                                       // Postfix used throughout as tested faster than prefix!!
    }
    x++
  }                                                                             // there are  no other particles to write

  t      = WORLD                                                                // Swap the current with the newly created world
  WORLD  = WORLD2
  WORLD2 = t

  function wrapX(x)                                                             // Wrap X cordinates for boundryless world
  {
    if (x < 0)
    {
      x += BWIDTH
    }
    if (x >= BWIDTH)
    {
      x -= BWIDTH
    }

    return x
  }

  function wrapY(y)                                                             // Wrap Y cordinates for boundryless world
  {
    if (y < 0)
    {
      y += BHEIGHT
    }
    if (y >= BHEIGHT)
    {
      y -= BHEIGHT
    }

    return y
  }
}

function updateCritrs()                                                         // The variations of CRITRS
{
  let k, x, y, r, s, t1, t2, rx1, rx2, ry1, ry2,
      j  = 0,
      j1 = MULTIPASS ? LEN1 : 1,
      k1 = MULTIPASS ? LEN2 : 1

  do
  {
    k = 0

    do
    {
      x = j

      while (x < j + (HARDB ? BWIDTH - LEN1 : BWIDTH + LEN1))
      {
        y = k

        while (y < k + (HARDB ? BHEIGHT - LEN2 : BHEIGHT + LEN2))
        {
          r = 0

          while (r < LEN1)
          {
            s = 0

            while (s < LEN2)
            {
              if (WORLD[(x + r) % BWIDTH][(y + s) % BHEIGHT])
              {
                rx1 = (x + RULES[r][s][1] + LENX1) % BWIDTH
                ry1 = (y + RULES[r][s][0] + LENY1) % BHEIGHT
                rx2 = (x + RULES[r][s][3] + LENX1) % BWIDTH
                ry2 = (y + RULES[r][s][2] + LENY1) % BHEIGHT

                if (t1 = WORLD[rx1][ry1]) ++t1
                if (t2 = WORLD[rx2][ry2]) ++t2

                if (!STEPFLAG && t1 != t2)
                {
                  if (TRACK)
                  {
                    WORLD2[rx1][ry1] = 1                                        // Leave a trace if a swap was made
                  }

                  WORLD[rx1][ry1] = t2
                  WORLD[rx2][ry2] = t1
                }
              }
              s++
            }
            r++
          }
          y += k1
        }
        x += j1
      }
      ++k
    } while (k < k1)
    ++j
  } while (j < j1)
}

function drawWorld()
{
  let lx, xp, w, y,                                                             // Rendering routine allowing
      x = 0,
      c = '',                                                                   // for zoom and panning
      d = 0

  const p  = SCALEX * RSLTN,                                                     // Calculate now, once, and not in the loops
        q  = SCALEY * RSLTN,
        p1 = FPS < 15 ? Math.ceil(p / 4 + .5) : p / 4 + .5,
        q1 = FPS < 15 ? Math.ceil(q / 4 + .5) : q / 4 + .5,
        a  = FPS < 15 ? div(p + 1) : p + 1,
        b  = FPS < 15 ? div(q + 1) : q + 1,
        bh = BHEIGHT *.8,
        bw = BWIDTH  *.8,
        h  = div(bh - p - 2)         - OFFSETY,
        i  = div(BWIDTH / 5 + q + 2) - OFFSETX * 1.8,
        wq = BWIDTH  * RSLTN,
        hq = BHEIGHT * RSLTN

  CONTEXT.fillStyle = '#102'                                                    // World background color
  CONTEXT.fillRect(0, 0, wq, hq)                                                // Clear the canvas

  while (x < WIDTH)                                                             // Process through current world view, x first
  {
      y  = 0
      lx = LEFT + x
      xp = OFFSETX + div(x * p)

    while (y < HEIGHT)                                                          // Then y
    {
      if (w = Math.ceil(WORLD[lx][TOP + y]))                                    // Found a particle?
      {
        if (c != w)                                                             // To minimise speed loss...
        {
          CONTEXT.fillStyle = c = MONO ? COLORS[1] : COLORS[w % 256]            // Change color, but only if different to last time
        }

        CONTEXT.fillRect(xp, OFFSETY + div(y * q), a, b)                        // Draw the particle
      }
      else if (TRACK && (w = WORLD2[lx][TOP + y]) && ++d == 8)                  // Is tracking on?
      {
        d = 0

        if (c != w)
        {
          CONTEXT.fillStyle = c = '#bdf'                                        // Change color if different
        }

        CONTEXT.fillRect(xp, OFFSETY + div(y * q), p1, q1)                      // Yes so draw dot
      }
      y++
    }
    x++
  }

  if (CONTROL.f)
  {
    CONTEXT.globalCompositeOperation = 'lighter'
    CONTEXT.setLineDash([4, 4])
    CONTEXT.strokeStyle = '#fff'
    CONTEXT.beginPath()

    if      (CONTROL.f == 1)
    {
      CONTEXT.moveTo(OFFSETX + CONTROL.x1 * RSLTN,                              // Outline single line rubber band
                     OFFSETY + CONTROL.y1 * RSLTN)
      CONTEXT.lineTo(OFFSETX + CONTROL.x2 * RSLTN,
                     OFFSETY + CONTROL.y2 * RSLTN)
    }
    else
    {
      CONTEXT.rect(OFFSETX +  CONTROL.x1               * RSLTN,                 // Outline rectangle rubber band
                   OFFSETY +  CONTROL.y1               * RSLTN,
                   OFFSETX + (CONTROL.x2 - CONTROL.x1) * RSLTN,
                   OFFSETY + (CONTROL.y2 - CONTROL.y1) * RSLTN)
    }

    CONTEXT.stroke()
    CONTEXT.setLineDash([])
    CONTEXT.globalCompositeOperation = 'source-over'
  }

  if (CRITRTYPE == 0)
  {
    backtoBin()                                                                 // Have the colors restart at 1
  }

  drawSmall()
}

function backtoBin()                                                            // Resets colors of particles
{
  let y,
      x = 0

  if (STEP)                                                                     // Don't remove color info if stepping
  {
    return
  }

  while (x < BWIDTH)                                                            // Restarting at 1 keeps colors consistent and...
  {
    y = 0
    WORLD2[x].fill(0)

    while (y < BHEIGHT)                                                         // ...less sparkly
    {
      WORLD[x][y] = WORLD[x][y] ? 1 : 0                                         // All positive values bcome 1
      y++
    }
    x++
  }
}

function drawSmall()                                                            // Draws a small version of the world in the guide window
{
  let y,
      x = 0

  const bh  = BHEIGHT * .8,                                                     // Calculate in advance, outside of the loops
        h   = div(bh * RSLTN),
        q   = RSLTN   / 5,
        q5  = RSLTN   * 5,
        lq  = LEFT    * q,
        tq  = TOP     * q,
        mx  = PAGEX   * q - canvas.offsetLeft,
        my  = PAGEY   * q + h,
        bhq = BHEIGHT * q,
        bwq = BWIDTH  * q,
        wx  = (ZOOMLEV == ZOOMCT) ? WIDTH * q -2 : WIDTH * q,
        hy  = HEIGHT  * q - 1,
        wx1 = wx      * 5 / RSLTN,
        hy1 = hy      * 5 / RSLTN

  if (GUIDE && GUIDECT == 0)                                                    // If on and the counter is ready, display the guide window
  {
    GUIDECT = GUIDERATE                                                         // GUIDERATE is the frame delay between redraws

    CONTEXT.fillStyle = EDITMODE ? '#006' : '#204'                              // Fill background of guide window
    CONTEXT.fillRect(1, bh * RSLTN - 1, bwq, bhq)
    CONTEXT.fillStyle = EDITMODE ? '#205' : '#402'                              // Fill background of selection
    CONTEXT.fillRect(lq + 2, h + tq, wx, hy)

    while (x < BWIDTH)                                                          // Draw a mini copy of the world
    {
      y = 0

      while (y < BHEIGHT)
      {
        if (WORLD[x][y])
        {
          if (x > (LEFT      ) &&
              x < (LEFT + wx1) &&
              y > (TOP       ) &&
              y < (TOP  + hy1))
          {
            CONTEXT.fillStyle = '#ff0'                                          // Inside selection
          }
          else
          {
            CONTEXT.fillStyle = '#888'                                          // Outside selection
          }

          CONTEXT.fillRect(div(    (x / 5) * RSLTN),                            // Draw pixels
                           div(h + (y / 5) * RSLTN), 1, 1)
        }
        y++
      }
      x++
    }

    CONTEXT.strokeStyle = EDITMODE ? '#fff' : '#8af'
    CONTEXT.beginPath()
    CONTEXT.rect(lq + 2, h + tq, wx, hy)                                        // Outline selection
    CONTEXT.stroke()

    CONTEXT.strokeStyle = '#fff'
    CONTEXT.beginPath()
    CONTEXT.rect(0, bh * RSLTN - 2, bwq + 2, bhq + 2)                           // Outline guide window
    CONTEXT.stroke()

    TGUIDE = CONTEXT.getImageData(1, h - 4, bwq + 4, bhq + 4)                   // Copy the guide to save recreating it over and over
  }
  else if (GUIDE)
  {
    CONTEXT.strokeStyle = EDITMODE ? '#fff' : '#8af'
    CONTEXT.beginPath()
    CONTEXT.rect(lq + 2, h + tq, wx, hy)                                        // Outline selection
    CONTEXT.stroke()

    CONTEXT.strokeStyle = '#fff'
    CONTEXT.beginPath()
    CONTEXT.rect(0, bh * RSLTN - 2, bwq + 2, bhq + 2)                           // Outline guide window
    CONTEXT.stroke()

    CONTEXT.putImageData(TGUIDE, 1, h - 4)                                      // Paste the copy of the guide to the canvas
    GUIDECT--                                                                   // Count down to the next full redraw
  }

  GUIDERATE = Math.min(div(160 / Math.min(FPS, 160)), 10)                       // The slower the FPS the less frequently the guide redraws

  if (GUIDE && !EDITMODE)                                                       // Mini mouse pointer
  {
    CONTEXT.fillStyle = '#00f'
    CONTEXT.fillRect(mx,     my,      2, 10)
    CONTEXT.fillRect(mx + 2, my +  2, 2,  8)
    CONTEXT.fillRect(mx + 4, my +  4, 2,  8)
    CONTEXT.fillStyle = '#aaf'
    CONTEXT.fillRect(mx,     my,      1,  3)
    CONTEXT.fillRect(mx + 1, my + 1,  1,  2)
  }
}

function setupCanvas()                                                          // Sets up the canvas
{
  canvas.width         = BWIDTH  * RSLTN
  canvas.height        = BHEIGHT * RSLTN
  canvas.style.border  = 'solid 1px #fff'
  canvas.style.opacity = '100%'

  CANV.rpl = canvas.requestPointerLock || canvas.mozRequestPointerLock          // For requesting a pointer lock on the cursor
}

function clearWorld()                                                           // Empties the world of all particles
{
  let y,
      x = MAXWIDTH - 1

  while (x >= 0)
  {
    WORLD[x--].fill(0)
  }

  ifStep(1)
}

function ifStep(f)                                                              // Updates world if not stepping and draws the world
{
  if (f || !EDITMODE && CRITRTYPE == 0)
  {
    updateWorld()
  }

  drawWorld()
}

function editCursor()                                                           // Keeps the edit cursor updated
{
  if (MOUSEY < HEIGHT)
  {
    editcursor.style.display = 'block'
  }
  else
  {
    editcursor.style.display = 'none'
  }
}

function randomOpenRectangle()                                                  // Draws a random open rectangle of particles in the world
{
  rectangle(randInt(WIDTH), randInt(HEIGHT),
            randInt(WIDTH), randInt(HEIGHT), RCLICK ? 0 : 1)

  ifStep(1)
}

function randomFilledRectangle()                                                // Draws a random filled rectangle of particles in the world
{
  filledRectangle(randInt(WIDTH), randInt(HEIGHT),
                  randInt(WIDTH), randInt(HEIGHT), RCLICK ? 0 : 1)
  ifStep(1)
}

function randomLine()                                                           // Draws a random line of particles in the world
{
  line(randInt(WIDTH), randInt(HEIGHT),
       randInt(WIDTH), randInt(HEIGHT), RCLICK ? 0 : 1)

  ifStep(1)
}

function line(x1, y1, x2, y2, c = 1)                                            // Draws a line of particles in the world
{
  x1 += LEFT
  y1 += TOP
  x2 += LEFT
  y2 += TOP

  const dx = Math.abs(x2 - x1),
        dy = Math.abs(y2 - y1),
        sx = Math.sign(x2 - x1),
        sy = Math.sign(y2 - y1)

  let e2,
      er = (dx > dy ? dx : -dy) / 2

  while (x1 != x2 || y1 != y2)
  {
    WORLD[x1][y1] = c
    e2            = er

    if (e2 > -dx)
    {
      er -= dy
      x1 += sx
    }

    if (e2 < dy)
    {
      er += dx
      y1 += sy
    }
  }

  WORLD[x1][y1] = c
}

function rectangle(x1, y1, x2, y2, c = 1)                                       // Draws an open rectangle of particles in the world
{
  line(x1, y1, x2, y1, c)
  line(x2, y1, x2, y2, c)
  line(x2, y2, x1, y2, c)
  line(x1, y2, x1, y1, c)
}

function filledRectangle(x1, y1, x2, y2, c = 1)                                 // Draws a filled rectangle of particles in the world
{
  let j = x1

  while (j != x2)
  {
    line(j, y1, j, y2, c)

    j += Math.sign(x2 - x1)                                                     // Either + or - according to +ve or -ve value
  }
}

function makeCode()                                                             // Creates a preset suitable for adding to presets.js
{
  let j, k, x, y, d, e,
      s = '',
      c = '[' + CRITRTYPE + ',',                                                // Preset header with the type of Critr, which for...
      o = ''

  if (CRITRTYPE == 0)                                                           // ...type 0 is CRITRS
  {
    c += LEN1 + ','  + LEN2 + ',' + Math.sign(LIMIT) + ','                     // the width and height of the rule matrix
                                                                                // And whether rules are limited to a 2x2 section
    for (x = 0 ; x < LEN1 ; ++x)                                                // Extracts the rule set into c
      for (y = 0 ; y < LEN2 ; ++y)
        for (j = 0 ; j < 4 ; ++j)
          c += RULES[x][y][j] + ','
  }
  else if (CRITRTYPE == 1)                                                      // Type 1 is Life
  {
    for (j = 0 ; j < 8 ; ++j)
      c += (VLIFEB[j] ? '1' : '0') + ','                                        // The create rules

    for (j = 0 ; j < 8 ; ++j)
      c += (VLIFED[j] ? '1' : '0') + ','                                        // The remove rules
  }

  c += BWIDTH.toString()  + ',' +                                               // Canvas width and height
       BHEIGHT.toString() + ',' + "'"

  for (j = 0 ; j < BWIDTH ; ++j)                                                // Convert WORLD to string of integers
    for (k = 0 ; k < BHEIGHT ; ++k)
      o += div(WORLD[j][k]).toString().padStart(3, '0')

  copyText(c + o.compress() + "'],\n")                                          // Copies the compressed preset to the keyboard buffer
}

function decodeWorld(s, w, h)                                                   // Unpacks the above and applies it
{
  let d, l, x, y, z,
      j = 0

  setRes(div(CANVW / w))                                                        // Make the resolution just big enough for the content

  SHOWN = false
  d     = s.decompress()
  l     = d.length - 3

  for (x = 0 ; x < w ; ++x)
    for (y = 0 ; y < h ; ++y, j += 3)
      WORLD[x][y] = parseInt(d.substring(j, j + 3))
}

function copyText(text)                                                         // This saves to the clipboard
{
  if (!navigator.clipboard) return copyTextAlt(text)

  navigator.clipboard.writeText(text).then
  (
    function()    { alert(                  DIDCOPY + text) },
    function(err) { alert('ERROR: ' + err + NOTCOPY + text) }
  )

  function copyTextAlt(text)                                                    // Alternate method if the first fails
  {
    let ta = document.createElement("textarea")                                 // First create a textarea for the buffer text

    ta.value          = text
    ta.style.top      = '0'
    ta.style.left     = '0'
    ta.style.position = 'fixed'

    document.body.appendChild(ta)                                               // Append the textarea, select and focus it
    ta.focus()
    ta.select()

    try                                                                         // Try and catch in case it fails
    {
      if (document.execCommand('copy'))
      {
        alert(DIDCOPY + text)
      }
      else
      {
        alert(NOTCOPY + text)
      }
    }
    catch (err)
    {
      alert('ERROR: ' + err + NOTCOPY + text)
    }

    document.body.removeChild(ta)                                               // Don't need the textarea any more
  }
}

function monoColor()                                                            // Switch for mono/color
{
  MONO  = !MONO
  SHOWN = false
}

function playCritrs()                                                           // Switch to playing CRITRS
{
  CRITRTYPE            = 0
  SHOWN                = false
  matrix.style.display = 'block'
}

function playLife()                                                             // Switch to playing Life
{
  VLIFEB               = [0, 0, 1, 0, 0, 0, 0, 0]                               // Standard
  VLIFED               = [1, 0, 0, 1, 1, 1, 1, 1]                               // Life rules
  CRITRTYPE            = 1
  SHOWN                = false
  matrix.style.display = 'none'
}

function updateControls()                                                       // Just update the info section each frame
{
  const n  = LEN1 * LEN2,
        mt = div(15.9 - MUTATECT / FPS),
        p  = PRESET == 0 ? PRESETS.length : PRESET,
        q  = (PRESET == PRESETS.length - 1) ?
                        PRESETS.length : (PRESET + 1) % PRESETS.length,
        r  = LIMIT ? 7 : n * (n - 1) / 2 + 1

  let t = r ** n

  if (mt < MT) MT = mt

  t = t.toExponential(2).toString()
  t = t.substr(0, 4) + " &times; 10<sup>" + t.substr(6) + "</sup>"

  i0.innerHTML = Math.ceil((ZOOMLEV / ZOOMCT * 100)) + "% (" +
                 WIDTH + " &times; " + HEIGHT + ")"
  i1.innerHTML = DIDPRESET? p + " of " + PRESETS.length :
                 "None (Next is " + q + " of " + PRESETS.length + ")"
  i3.innerHTML = ((STEP || EDITMODE) ? 0 : FPS) + " FPS"

  if (CRITRTYPE == 0)
  {
    i2a.innerHTML = MUTATE ? 'Next Mutation in...' : 'Not Mutating'
    i2b.innerHTML = MUTATE ? MT + " seconds" : ""
    i4.innerHTML  = LEN1 + " &times; " + LEN2
    i5.innerHTML  = n
    i6.innerHTML  = r.toLocaleString()
    i7.innerHTML  = r + "<sup>" + n + "</sup> = " + t
  }
}

function showRules()                                                            // Displays the rules matrix
{
  let c, c1, c2, x, y, p, q, s

  if (CRITRTYPE == 1)
  {
    return
  }

  const l1 = div(LEN1 / 2),
        l2 = div(LEN2 / 2)

  for (y = 0, s = "<table id=matrix style='border:1px " +
    "solid #00f;background:#004;opacity:80%'>" ; y < LEN2 ; ++y, s += '</tr>')
  {
    for (x = 0, s += '<tr>' ; x < LEN1 ; ++x,
      s += "</table style='background:#008'></td>")
    {
      s +='<td align=center><table'

      if (MUTATED.f && MUTATED.x == x && MUTATED.y == y)
      {
        s += ' bgcolor=#22a'
      }

      if (LIMIT && (x == l1 || (x == l1 - 1)) &&
                   (y == l2 || (y == l2 - 1)))
      {
        s += ' bgcolor=#f00'
      }

      s += '>'

      for (p = 0 ; p < (LIMIT ? Math.min(LEN2, 2) : LEN2) ; ++p, s += '</tr>')
      {
        for (q = 0, s += '<tr>' ; q < (LIMIT ? Math.min(LEN1, 2) : LEN1) ; ++q,
          s += '</div></td>')
        {
          c = '<td class="cell" valign=middle'

          if (MUTATED.f && MUTATED.x == x && MUTATED.y == y)
          {
            if (MUTATED.p == p && MUTATED.q == q ||
                MUTATED.r == p && MUTATED.s == q)
            {
              c += ' style="background:#08f;color:#ff0"'
            }
          }

          c += '><div style="margin-top:-3px; width:18px; margin-left:-2px" ' +
               'onclick="setRule('+ x + ',' + y + ',' + p + ',' + q + ','
          c1 = c + 2 + ',2)">&FilledSmallSquare;'
          c2 = c + 0 + ',2)">&EmptySmallSquare;'

          if ( RULES[x][y][0] == p && RULES[x][y][1] == q ||
               RULES[x][y][2] == p && RULES[x][y][3] == q)
          {
            s += c1
          }
          else
          {
            s += c2
          }
        }
      }
    }
  }

  s += '</table>'
  output1.innerHTML = s
}

function setRule(x, y, p, q, r, s)                                              // Sets a single rule
{
  RULES[x][y][r    ] = p
  RULES[x][y][r + 1] = q

  if (s)
  {
    if (s == 2)
    {
      MUTATED.f = false
    }

    showRules()
  }
}

function setRules()                                                             // Sets a random set of rules
{
  let j, x, y, z

  if (CRITRTYPE == 1)                                                           // Life
  {
    for (j = 0 ; j < 8 ; ++j)
    {
      VLIFEB[j] = randInt(2)                                                    // Random create
      VLIFED[j] = randInt(2)                                                    // Random remove
    }

    SHOWN = false
    return
  }

  LENX  = div(LEN1 / 2)                                                         // Half the dimensions of the matrix
  LENY  = div(LEN2 / 2)                                                         // Use for selecting the matrixes most central 2x2 section
  LENX1 = LIMIT ? LENX : 0                                                      // Only applied if LIMIT is true
  LENY1 = LIMIT ? LENY : 0

  for (x = 0 ; x < LEN1 ; ++x)
    for (y = 0 ; y < LEN2 ; ++y)
      for (z = 0 ; z < 2 ; ++z)
        setRule(x, y, (LIMIT ? randInt(Math.min(LEN2, 2)) : randInt(LEN2)),
                      (LIMIT ? randInt(Math.min(LEN1, 2)) : randInt(LEN1)),
                        z * 2, 0)
  MUTATED.f = false
  STEPFLAG  = false
  DIDPRESET = false

  showRules()
}

function writeCritrs()                                                          // Draw app name
{
  const t = div(HEIGHT / 5),                                                    // Top line
        m = div(HEIGHT / 2),                                                    // Middle line
        a = div((m - t) / 2),                                                   // Quarter character height
        b = t * 4,                                                              // Bottom line
        d = div((WIDTH / 1.5) / 5),                                             // Character spacing
        w = div(d / 2),                                                         // Character width
        h = div(t + a),                                                         // Halfway between top and middle
        j = div(m + a),                                                         // Halfway between middle and bottom
        C = div(WIDTH / 7),                                                     // Horizontal placement of C
        r = C + d,                                                              // Horizontal placement of r
        i = r + d,                                                              // Horizontal placement of i
        T = i + d,                                                              // Horizontal placement of t
        R = T + d,                                                              // Horizontal placement of r
        s = R + d                                                               // Horizontal placement of s

  line(C,     t, C + w, t)                                                      // C
  line(C,     t, C,     b)
  line(C,     b, C + w, b)

  line(r,     m, r + w, m)                                                      // r
  line(r,     m, r,     b)

  line(i,     m, i,     b)                                                      // i

  line(T,     h, T,     b)                                                      // t
  line(T,     m, T + w, m)

  line(R,     m, R + w, m)                                                      // r
  line(R,     m, R,     b)

  line(s,     m, s + w, m)                                                      // s
  line(s,     m, s,     j)
  line(s,     j, s + w, j)
  line(s + w, j, s + w, b)
  line(s,     b, s + w, b)
}

function newPreset()                                                            // Populate the array with the next set of rules
{
  let h, s, x, w, y, z,
      n = 0

  CRITRTYPE = PRESETS[PRESET][n++]                                              // Fetch the CRITR type, then if...

  if (CRITRTYPE == 0)                                                           // CRITRS
  {
    LEN1  = PRESETS[PRESET][n++]                                                // Width, height and whether limited to 2x2
    LEN2  = PRESETS[PRESET][n++]
    LIMIT = PRESETS[PRESET][n++] == 1 ? true : false

    for (x = 0 ; x < LEN1 ; ++x )
      for (y = 0 ; y < LEN2 ; ++y)
        for (z = 0 ; z < 4 ; ++z)
          RULES[x][y][z] = PRESETS[PRESET][n++]                                 // Retrieve the rules

    showRules()                                                                 // Display the new rules
  }
  else if (CRITRTYPE == 1)                                                      // Life
  {
    for (x = 0 ; x < 8 ; ++x)
      VLIFEB[x] = PRESETS[PRESET][n++]                                          // Retrieve the create rules

    for (x = 0 ; x < 8 ; ++x)
      VLIFED[x] = PRESETS[PRESET][n++]                                          // Retrieve the remove rules

    output1.style.display = 'none'
  }

  w = PRESETS[PRESET][n++]
  h = PRESETS[PRESET][n++]
  s = PRESETS[PRESET][n++]

  clearWorld()

  if (s != '')
  {
    decodeWorld(s, w, h)
  }
  else
  {
    writeCritrs()
  }

  MUTATECT  = 0                                                                 // Reset mutation (if enabled)
  DIDPRESET = true
  MT        = 16
  SHOWN     = false
  MUTATED.f = false

  if (++PRESET >= PRESETS.length)
  {
    PRESET = 0                                                                  // Move pointer to next preset ready for subsequent call
  }
}

function changeRes()                                                            // Modify global variables relating to display
{
  WIDTH  = div(ZOOMLEV * MODEX)                                                 // Determine window width and height
  HEIGHT = div(ZOOMLEV * MODEY)
  SCALEX = BWIDTH  / (ZOOMLEV * MODEX)                                          // Work out the scaling factor to enlarge by
  SCALEY = BHEIGHT / (ZOOMLEV * MODEY)

  updateTopLeft()
}

function updateTopLeft()                                                        // Calculate TOP and LEFT of window
{
  let dl = BWIDTH  - WIDTH,
      dt = BHEIGHT - HEIGHT,
      sx = div((PAGEX - canvas.offsetLeft) * (dl / BWIDTH)),
      sy = div((PAGEY - canvas.offsetTop)  * (dt / BHEIGHT))

  LEFT = sx >= dl ? dl : (sx < 0) ? 0 : sx
  TOP  = sy >= dt ? dt : (sy < 0) ? 0 : sy
}

canvas.addEventListener('mousedown', doMousedown)                               // The mouse button is down

function doMousedown(e)
{
  if (SHIFT)
  {
    doEditmode()
  }

  if (e.which == 1)
  {
    LCLICK = true                                                               // Left button pressed
  }

  if (e.which == 3)
  {
    RCLICK = true                                                               // Right button pressed
  }
  
  doMousemove(e)                                                                // Get latest mouse X/Y so the click registers correctly

  e.stopPropagation()                                                           // Don't pass event to system
  e.stopImmediatePropagation()
  e.preventDefault()
}

function doEditmode()                                                           // Lock the mouse pointer and use a second one for editing
{
  if (!EDITMODE)
  {
    if (!(document.pointerLockElement    === canvas||
          document.mozPointerLockElement === canvas))
    {
      CANV.rpl()
    }
  }
}

canvas.addEventListener( 'wheel', doZoom)                                       // Wheel or touchpad scroll
output1.addEventListener('wheel', doZoom)
output2.addEventListener('wheel', doZoom)

function doZoom(e)                                                              // The mouse wheel has been moved so zoom
{
  const y = e.wheelDelta  ? e.wheelDelta : -e.deltaY,                           // Direction of zoom
        t = e.wheelDeltaY ? e.wheelDeltaY == -3 *
            e.deltaY      : e.deltaMode   ==  0,                                // Touchpad or mouse?
        m = t ? 1.5 : 16 / RSLTN                                                // Amount to zoom by (less for Touchpad or Quarter Res)

  clearTimeout(ROTIMEOUT)                                                       // Still zooming, cancel the call to remove the offsets

  e.stopPropagation()                                                           // Don't pass event to system
  e.stopImmediatePropagation()
  e.preventDefault()

  if (!EDITMODE && SHIFT )                                                      // As long as we aren't editing
  {
    PAGEX = e.pageX / RSLTN                                                     // We need copies of these here...
    PAGEY = e.pageY / RSLTN                                                     // ...as well as from onMousemove
  }

  if (Math.sign(y) == 1)                                                        // Scroll forwards
  {
    ZOOMLEV -= ZOOMLEV / ZOOMCT * m                                             // Zoom in, more slowly as we go

    if (ZOOMLEV < 1)
    {
      ZOOMLEV = 1                                                               // Stay in bounds
    }
  }
  else                                                                          // Scroll backwards
  {
    ZOOMLEV += ZOOMLEV / ZOOMCT * m                                             // Zoom out, faster as we go

    if (ZOOMLEV > ZOOMCT)
    {
      ZOOMLEV = ZOOMCT                                                          // Stay in bounds
    }
  }

  changeRes()                                                                   // Update the canvas variables etc

  OFFSETX = ((e.pageX / RSLTN - canvas.offsetLeft) % SCALEX) * RSLTN            // Centers current pixel during
  OFFSETY = ((e.pageY / RSLTN                    ) % SCALEY) * RSLTN            // zoom to prevent jitter}

  if (GUIDE)
  {
    drawSmall()                                                                 // Draw small window
  }

  ROTIMEOUT = setTimeout(removeOffset, 150)                                     // Remove the offests in 150 milliseconds

  function removeOffset()                                                       // After zooming the offsets aren't wanted
  {
    OFFSETX = 0
    OFFSETY = 0
  }
}

document.body.addEventListener('mousemove', doMousemove)                        // The mouse has been moved so update position

function doMousemove(e)
{
  if (!EDITMODE && e.pageX < (BWIDTH  * RSLTN) &&                               // Only accept values within the canvas
                   e.pageY < (BHEIGHT * RSLTN))
  {
    PAGEX = e.pageX / RSLTN + canvas.offsetLeft - 2
    PAGEY = e.pageY / RSLTN
  }

  if (EDITMODE)                                                                 // If editing we are using the second pointer
  {
    if (SHIFT)
    {
      PAGEX += e.movementX
      PAGEY += e.movementY
      PAGEX  = Math.max(PAGEX, 0)
      PAGEX  = Math.min(PAGEX, BWIDTH)
      PAGEY  = Math.max(PAGEY, 0)
      PAGEY  = Math.min(PAGEY, BHEIGHT)
    }
    else                                                                        // Otherwise the regular pointer
    {
      EDITX += e.movementX
      EDITY += e.movementY
    }

    MOUSEX                = div(EDITX / SCALEX )                                // Set the mouse x & y
    MOUSEY                = div(EDITY / SCALEY )
    editcursor.style.left = EDITX * RSLTN + 'px'                                // And edit cursor x & y
    editcursor.style.top  = EDITY * RSLTN + 'px'
  }
  else
  {
    MOUSEX = div(e.offsetX / RSLTN / SCALEX)                                    // Locate the mouse
    MOUSEY = div(e.offsetY / RSLTN / SCALEY)
  }

  updateTopLeft()                                                               // AFter zooming the top left will have changed
}

canvas.addEventListener('mouseup', e =>                                         // The mouse button is up
{
  if (CONTROL.s)
  {
    if      (CONTROL.f == 1)
    {
      line(div(CONTROL.x1 / SCALEX), div(CONTROL.y1 / SCALEX),
           div(CONTROL.x2 / SCALEY), div(CONTROL.y2 / SCALEY))
    }
    else if (CONTROL.f == 2)
    {
      rectangle(div(CONTROL.x1 / SCALEX), div(CONTROL.y1 / SCALEX),
                div(CONTROL.x2 / SCALEY), div(CONTROL.y2 / SCALEY))
    }
    else if (CONTROL.f == 3)
    {
      filledRectangle(div(CONTROL.x1 / SCALEX), div(CONTROL.y1 / SCALEX),
                      div(CONTROL.x2 / SCALEY), div(CONTROL.y2 / SCALEY))
    }

    CONTROL.s = false
    CONTROL.f = false
  }
    
  LCLICK = RCLICK = false                                                       // Reset flags
})

window.addEventListener('contextmenu', function(e)                              // Disable pop-up right click menu
{
  e.preventDefault()                                                            // Prevents the default action
})                                                                              // (Not hiding our code, just preventing context menu)

window.addEventListener('keydown', function(e)                                  // A key has been pressed
{
  const code = e.keyCode ? e.keyCode : e.which                                  // Account for different browsers

  if (e.shiftKey)
  {
    SHIFT = true                                                                // Shift's state is needed in a few places
  }

  if (e.ctrlKey)
  {
    CONTROL.s = true                                                              // Control is used for rectangle rubnber banding
  }

  if (EDITMODE)
  {
    return                                                                      // These keys are ignored during editing
  }

  if (CRITRTYPE == 0)
  {
    switch(SHIFT ? code + 1000 : code)                                          // Add 1000 if Shift is pressed
    {
      case   69: setMultipass();          break                                 // E
      case   73: trackChange();           break                                 // I
      case   77: setMutate();             break                                 // M
      case   85: setLimit();              break                                 // U
      case   49: case 50: case 51:
      case   52: case 53: case 54:
      case   55: case 56: case 57:
        LEN1 = code - 48; changeMatrix(); break                                 // 1 - 9
      case 1049: case 1050: case 1051:
      case 1052: case 1053: case 1054:
      case 1055: case 1056: case 1057:
        LEN2 = code - 48; changeMatrix(); break                                 // Shift 1 - 9
    }
  }

  switch(SHIFT ? code + 1000 : code)                                            // Add 1000 if Shift is pressed
  {
    case   65: newPreset();               break                                 // A
    case   67: clearWorld();              break                                 // C
    case   68: setInfo();                 break                                 // D
    case   70: randomFilledRectangle();   break                                 // F
    case   71: setGuide();                break                                 // G
    case   72: setHardborder();           break                                 // H
    case   75: makeCode();                break                                 // K
    case   76: randomLine();              break                                 // L
    case   78: setRules();                break                                 // N
    case   79: randomOpenRectangle();     break                                 // O
    case   80: setStep();                 break                                 // P
    case   83: STEPFLAG = false;          break                                 // S
    case   84: monoColor();               break                                 // T
    case   87: writeCritrs();             break                                 // W
    case  188: minusRes();                break                                 // <
    case  190: plusRes();                 break                                 // >
  }

  function plusRes()
  {
    let r = RSLTN + 1

    if (r < 10)
    {
      setRes(r)
      SHOWN = false
    }
  }

  function minusRes()
  {
    let r = RSLTN - 1

    if (r > 0)
    {
      setRes(r)
      SHOWN = false
    }
  }

  function changeMatrix()                                                       // Modify the rules in the matrix
  {
    setRules()
    showRules()

    DIDPRESET = false
    SHOWN     = false
  }
})

function setHardborder()
{
  HARDB = !HARDB
  SHOWN = false
}

function setMultipass()
{
  MULTIPASS = !MULTIPASS
  SHOWN     = false
}

function trackChange()                                                          // Switch between tracking and not
{
  let x = BWIDTH - 1

  TRACK = !TRACK

  if (!TRACK)                                                                   // Leave traces in WORLD2 if tracking
  {
    while (x >= 0)                                                              // fast moving particles, so first
    {
      WORLD2[x--].fill(0)                                                       // empty WORLD2 before using it
    }
  }

  SHOWN = false
}

function setGuide()                                                             // Turn the guide winow on or off
{
  GUIDE = !GUIDE
  SHOWN = false
}

function setRes(r)
{
  if (RSLTN == 1 && r != 1)
  {
    scaleDown(r)
  }
  else
  {
    scaleUp(RSLTN)
    RSLTN = 1
    doResize()                                                                  // Resize the display
    scaleDown(r)
  }

  RSLTN = r
  doResize()                                                                    // Resize the display

  FPS = div((Math.log(RSLTN) + 1 ) * 50)

  FPSA.fill(FPS)                                                                // Fill FPS artray with estimated new FPS

  function scaleDown(r)
  {
    let c, d, j, k, l, m

    for (j = 0 ; j < BWIDTH ; ++j)
      for (k = 0 ; k < BHEIGHT ; ++k, WORLD[div(j / r)][div(k / r)] = d)
        for (l = 0, d = 0 ; l < r ; ++l)
          for (m = 0 ; m < r ; ++m)
            d |= WORLD[j + l][k + m]                                            // Or the multiple values to get one single value

    PAGEX /= r                                                                  // Modify mouse x & y copy accordingly
    PAGEY /= r
  }

  function scaleUp(r)
  {
    let c, j, k, l, m

    for (j = BWIDTH * r - r ; j >= 0 ; j -= r)
      for (k = BHEIGHT * r - r ; k >= 0 ; k -= r)
        for (l = 0, c = WORLD[div(j / r)][div(k / r)] ; l < r ; ++l)
          for (m = 0 ; m < r ; ++m)
            WORLD[j + l][k + m] = c                                             // Save the value to the corresponding expanded locations

    PAGEX *= r                                                                  // Modify mouse x & y copy accordingly
    PAGEY *= r
  }
}

function setLimit()                                                             // between limiting to 2x2 section or not
{
  LIMIT = !LIMIT

  if (LIMIT)
  {
    setRules()
    DIDPRESET= false
  }
  else
  {
    showRules()
  }

  SHOWN = false
}

function setMutate()                                                            // Switch between mutating and not
{
  MUTATE    = !MUTATE
  DIDPRESET = false

  if (!MUTATE)
  {
    MUTATECT  = 0
    MT        = MUTATEDELAY + 1
    MUTATED.f = false
  }

  SHOWN = false
}

function setStep()                                                              // Switch between stepping and not
{
  STEP = !STEP

  if (!STEP)
  {
    STEPFLAG = false
    MUTATECT = 0
    MT       = MUTATEDELAY + 1
  }

  SHOWN = false
}

function setInfo()                                                              // Allow the info display or not
{
  DISPLAY = !DISPLAY

  if (DISPLAY)
  {
    output1.style.display = 'block'
    output2.style.display = 'block'
  }
  else
  {
    output1.style.display = 'none'
    output2.style.display = 'none'
  }
}

if ("onpointerlockchange" in document)                                          // Did the user request edit mode?
{
  document.addEventListener('pointerlockchange', lockChanged, false)
}
else if ("onmozpointerlockchange" in document)                                  // Firefox version
{
  document.addEventListener('mozpointerlockchange', lockChanged, false)
}

function lockChanged()                                                          // Yes so set up edit momde and cursor etc
{
  if(document.pointerLockElement === canvas||
  document.mozPointerLockElement === canvas)
  {
    EDITMODE = true
    EDITX    = 6 + PAGEX - container.offsetLeft                                 // Why 6? Not sure yet...
    EDITY    = 6 + PAGEY - container.offsetTop
                         - canvas.offsetTop
    editcursor.style.left = EDITX + 'px'
    editcursor.style.top  = EDITY + 'px'
  }
  else                                                                          // No, they exited edit mode, so restore main cursor
  {
    EDITMODE                 = false
    editcursor.style.display = 'none'
  }

  SHOWN = false                                                                 // ALlow the info display to be updated
}

window.addEventListener('keyup', function(e)                                    // A key has been released
{
  if (SHIFT)                                                                    // Was shift previously pressed?
  {
    SHIFT = false                                                               // Yes, reset the Shift setting

    changeRes()
    updateTopLeft()
    drawWorld()
  }
})

window.addEventListener("resize", doResize)                                     // Listen for if the user resizes the browser

function doResize()                                                             // If so update the canvas dimensions etc accordingly
{
  CANVW   = Math.min(MAXWIDTH,  window.innerWidth  - 32),                       // The width and height of the canvas may have
  CANVH   = Math.min(MAXHEIGHT, window.innerHeight - 12),                       // changed after a resize
  BWIDTH  = div(CANVW / RSLTN),
  BHEIGHT = div(CANVH / RSLTN),
  MODEX   = BWIDTH  / ZOOMCT,
  MODEY   = BHEIGHT / ZOOMCT,

  changeRes()
  setupCanvas()
}

function randInt(n)                                                             // Returns a random integer between 0 and n
{
  return div(Math.random() * n)
}

function createArray(length)                                                    // Creates an array of any number of dimensions
{
  let args,
      a = new Array(length || 0),
      i = length

  if (arguments.length > 1)
  {
    args = Array.prototype.slice.call(arguments, 1)

    while(i--)
    {
      a[length-1 - i] = createArray.apply(this, args)
    }
  }

  return a
}

String.prototype.compress = function(asArray)                                   // By Bruce Thomas
{                                                                               // https://gist.github.com/fliptopbox
  asArray = (asArray === true)

	let c, i, wc,
		  dictionary   = {},
		  uncompressed = this,
		  w            = "",
		  result       = [],
		  ASCII        = '',
		  dictSize     = 256

	for (i = 0; i < 256; ++i)
  {
		dictionary[String.fromCharCode(i)] = i
	}

	for (i = 0; i < uncompressed.length; ++i)
  {
		c  = uncompressed.charAt(i)
		wc = w + c

		if (dictionary.hasOwnProperty(wc))
    {
			w = wc
		}
    else
    {
			result.push(dictionary[w])

			ASCII         += String.fromCharCode(dictionary[w])
			dictionary[wc] = dictSize++
			w              = String(c)
		}
	}

	if (w !== "")
  {
		result.push(dictionary[w])
		ASCII += String.fromCharCode(dictionary[w])
	}

	return asArray ? result : ASCII
}

String.prototype.decompress = function()
{
	let i, k, result, w,
      tmp        = [],
      dictionary = [],
      compressed = this,
      entry      = "",
      dictSize   = 256

	for (i = 0; i < 256; i += 1)
  {
		dictionary[i] = String.fromCharCode(i)
	}

	if(compressed && typeof compressed === 'string')
  {
		for(i = 0; i < compressed.length; ++i)
    {
			tmp.push(compressed[i].charCodeAt(0))
		}

		compressed = tmp
		tmp        = null
	}

	w      = String.fromCharCode(compressed[0])
	result = w

	for (i = 1; i < compressed.length; ++i)
  {
		k = compressed[i]

		if (dictionary[k])
    {
			entry = dictionary[k]
		}
    else
    {
			if (k === dictSize)
      {
				entry = w + w.charAt(0)
			}
      else
      {
				return null
			}
		}

		result                     += entry
		dictionary[dictSize++] = w +  entry.charAt(0)

		w = entry
	}

	return result
}
