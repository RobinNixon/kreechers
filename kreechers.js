 "use strict"                                                                   // Kreechers (c) 2021 Robin Nixon

const DIDCOPY = "The following code has been copied to the clipboard. Paste " + // Used if copying to the keyboard buffer succeeded...
                "it into the 'presets.js' file.\n\n",
      NOTCOPY = " Could not copy the below to the clipboard, so manually "    + // ... or failed
                "type it into the 'presets.js' file.\n\n",

      MUTATEDELAY = 15,                                                         // Constant integers - Delay in seconds between mutations
      FPSBUFSIZE  = 200,                                                        // Size of frame counter buffer
      MAXWIDTH    = 2600,                                                       // Should fit most monitor widths
      MAXHEIGHT   = 700,                                                        // No need for more height than this

      abs   = Math.abs,                                                         // Shortened names for frequently used Math functions
      ceil  = Math.ceil,
      floor = Math.floor,
      int   = parseInt,
      log   = Math.log,
      max   = Math.max,
      min   = Math.min,
      sign  = Math.sign

let DIDPRESET = true,                                                           // Flags that start off true - A preset was just loaded
    GUIDE     = true,                                                           // The guide window is displayed
    DISPLAY   = true,                                                           // The Rules and details windows are shown

    MUTATE    = false,                                                          // Flags that start off false - Mutation on/off
    SHOWN     = false,                                                          // True if Det5ails window must be redrawn
    LIMIT     = false,                                                          // True when limiting rules to 2x2 section
    LCLICK    = false,                                                          // True if left mouse button held down
    RCLICK    = false,                                                          // True if right mouse button held down
    STEP      = false,                                                          // Can be set by user or script to pause updates
    STEPPING  = false,                                                          // True only if the user selected stepping
    SHIFT     = false,                                                          // True if SHift held down
    EDITMODE  = false,                                                          // True when in Edit mode
    MONO      = false,                                                          // True when display is on mono
    TRACK     = false,                                                          // True if displaying tracking of particles
    HARDB     = false,                                                          // True if hard borders are active
    LIFECENT  = false,                                                          // True if center cell is counted
    MULTIPASS = false,                                                          // True if multiple passes used
    STEPFLAG  = false,                                                          // True whenever another step is to be taken
    NOMOVE    = false,                                                          // True when the details window must not move

    MOUSEX    = 0,                                                              // Globals initialized to 0 - Mouse X & Y
    MOUSEY    = 0,
    EDITX     = 0,
    EDITY     = 0,
    PAGEX     = 0,
    PAGEY     = 0,
    EPAGEX    = 0,
    EPAGEY    = 0,
    PRESET    = 0,
    MUTATECT  = 0,
    OFFSETX   = 0,
    OFFSETY   = 0,
    TOP       = 0,
    ROTIMEOUT = 0,
    GUIDECT   = 0,
    LEFT      = 0,
    CATYPE    = 0,
    WOLFRULE  = 0,

    WOLFOFFSET = 2,
    GUIDERATE  = 10,
    RSLTN      = 1,                                                             // 1 = highest, 9 = lowest - start at 1 for setup...
    CONTROL    = {s : false, f : false},
    ALT        = {s : false, f : false},
    INFO       = {},
    SAVED      = [],
    COPYBUF    = {},
    WOLFRAM    = createArray(256, 8, 4),
    CANVW      = min(MAXWIDTH,  window.innerWidth  - 32),                       // These are the sacrosact values for the width & height
    CANVH      = min(MAXHEIGHT, window.innerHeight - 12),                       // Others may be calculated and so slightly off
    BWIDTH     = CANVW,                                                         // The width and height generally worked from
    BHEIGHT    = CANVH,                                                         // Varies according to resolution
    WORLD      = createArray(MAXWIDTH, MAXHEIGHT),                              // The game world
    WORLD2     = createArray(MAXWIDTH, MAXHEIGHT),                              // A copy of the world for various uses
    ZOOMCT     = 100,                                                           // Number of zoom levels
    ZOOMLEV    = 100,                                                           // Current zoom level
    MODEX      = BWIDTH  / ZOOMCT,                                              // The Dimensions of the current zoom level
    MODEY      = BHEIGHT / ZOOMCT,
    WIDTH      = BWIDTH,                                                        // Width of current zoom
    HEIGHT     = BHEIGHT,                                                       // Height of current zoom
    SCALEX     = BWIDTH  / WIDTH,                                               // Scale factor for zoom level
    SCALEY     = BHEIGHT / HEIGHT,
    LEN1       = 2,                                                             // Matrix width and height
    LEN2       = 2,
    RULES      = createArray(9, 9, 4),                                          // Matrix of up to 9 x 9
    OLDFPS     = 30,                                                            // Quickly restore a good guess at FPS after pause or edit
    FPS        = 30,                                                            // Frame counter
    FPSA       = Array(FPSBUFSIZE).fill(FPS),                                   // FPS diplay smoothing array
    MUTATED    = new Object(),                                                  // Details about mutations
    MT         = MUTATEDELAY + 1,                                               // Counter for mutation delays
    TIME       = new Date().getTime(),                                          // The time now
    LENX       = floor(LEN1 / 2),                                               // Half the dimensions of the matrix
    LENY       = floor(LEN2 / 2),                                               // Use for selecting the matrixes most central 2x2 section
    LENX1      = LIMIT ? LENX : 0,                                              // Only used if LIMIT is true
    LENY1      = LIMIT ? LENY : 0,
    VLIFEB     = [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],                                // Arrays holding the rules - final element is center cell
    VLIFED     = [1, 1, 1, 0, 0, 1, 1, 1, 1, 0],                                // for the Game of Life
    CONTEXT    = canvas.getContext('2d', { alpha: false }),                     // A context into the canvas
    CANV       = canvas,                                                        // A pointer to the canvas
    TGUIDE     = ''

document.addEventListener("DOMContentLoaded", init)                             // Only start when ready

function init()                                                                 // Prepare everything
{
  iwin.style.top = -(iwin.offsetHeight + 20) + 'px'                             // Pop the instructions up high
  dwin.style.odisplay = 'block'                                                 // Make the control panel visible

  buildWolfram()                                                                // Build the Wolfram CA rules
  getFromStorage()                                                              // Fetch any saved patterns
  setupCanvas()                                                                 // Ready the canvas
  setRes(5)                                                                     // Select a medium resolution
  newPreset()                                                                   // Load in the first preset from presets.js

  setTimeout(mainLoop, 0)                                                       // Jump to the loop at next available cycle
}

function mainLoop()                                                             // Where it all happens
{
  let j, k, w, h, wd, hd, x

  const timenow = new Date().getTime(),                                         // Use to track frame rate
        l       = (1000 / (timenow - TIME)) | 0

  if (!STEPFLAG && !EDITMODE || CATYPE == 2)                                    // If not editing or stepping or Wolfram
  {
    updateWorld()                                                               // Process the world
    STEPFLAG = STEP                                                             // If stepping, reset the flag
  }

  drawWorld()
                                                                                // Because we may be modifying it
  if (EDITMODE)         editCursor()                                            // Creates a new cursor for editing and tracks it
  if (LCLICK || RCLICK)                                                         // Act on mouse clicks
  {
    if (!STEPPING) STEP = true

    editParticles()
  }
  else if (!STEPPING)
  {
    STEP     = false
    STEPFLAG = false
  }

  if (MUTATE)           mutateRule()                                            // Mutate arule if mutating is on
  if (DISPLAY)          showInfo()                                              // SHow the information and controls display

  for (j = 0, k = 0 ; j < (FPSBUFSIZE - 1) ; ++j)                               // Keep a buffer of framerates
  {                                                                             // to smooth the changes and shjow the average
    k      += FPSA[j    ]                                                       // over recent time
    FPSA[j] = FPSA[j + 1]
  }

  if (STEP || EDITMODE || LCLICK || RCLICK) FPSA[FPSBUFSIZE - 1] = OLDFPS       // Add current FPS to buffer
  else                                      FPSA[FPSBUFSIZE - 1] = l

  FPS    = floor((k + l) / FPSBUFSIZE)                                          // Calculate the average
  OLDFPS = FPS                                                                  // Keep a copy for restoring after pausing
  TIME   = timenow                                                              // What's the time now?

  setTimeout(mainLoop, 0)                                                       // We're done - go around again

  function editParticles()                                                      // These functions are within mainLoop() as this is
  {                                                                             // the only place they are called - keeps things clear
    if (CONTROL.s)                                                              // and the scope tidy
    {                                                                           // CONTROL.s is set if line or rectangle mode selected
      if (!CONTROL.f)                                                           // CONTROL.f is set once the start x,y point is chosen
      {
        if      (LCLICK && RCLICK) CONTROL.f = 3                                // Filled rectangle
        else if (LCLICK)           CONTROL.f = 1                                // STraight line
        else if (RCLICK)           CONTROL.f = 2                                // Open rectangle

        CONTROL.x1 = MOUSEX + LEFT                                              // Initial x,y location
        CONTROL.y1 = MOUSEY + TOP
      }

      CONTROL.x2 = MOUSEX + LEFT                                                // End x,y location of rubber band
      CONTROL.y2 = MOUSEY + TOP
    }
    else if (ALT.s)                                                             // ALT.s is set if using a selection
    {
      if (!ALT.f || !ALT.b)                                                     // ALT.f indicates selection start already made
      {                                                                         // ALT.b indicates selection rubber banding has started
        if (LCLICK || RCLICK) ALT.f = 1

        ALT.x1 = MOUSEX + LEFT                                                  // First corner x,y location
        ALT.y1 = MOUSEY + TOP
        ALT.b  = true
      }

      if (ALT.b)                                                                // Rubber banding in action
      {
        ALT.x2 = MOUSEX + LEFT                                                  // Opposite x,y corner loaction
        ALT.y2 = MOUSEY + TOP

        if (RCLICK)                                                             // Except if the right mousebutton is down
        {
          w  = abs( ALT.x2 - ALT.x1)
          h  = abs( ALT.y2 - ALT.y1)
          wd = sign(ALT.x2 - ALT.x1)
          hd = sign(ALT.y2 - ALT.y1)
          x  = w > h ? h : w

          if (h != w)                                                           // In which case limit the selection to a square shape
          {                                                                     // using the shortest side for both sides
            ALT.x2 = ALT.x1 + x * wd
            ALT.y2 = ALT.y1 + x * hd
          }
        }
      }
    }

    if (!CONTROL.s && (!ALT.s || !ALT.b))                                       // No edit mode or rubber banding
    {                                                                           // Just clicking to set/reset a particle
      if (MOUSEX + LEFT > 0 && MOUSEX + LEFT < BWIDTH &&
          MOUSEY + TOP  > 0 && MOUSEY + TOP  < BHEIGHT)
    WORLD[MOUSEX + LEFT]      [MOUSEY + TOP] = LCLICK ? 1 : 0                   // This simply sets or restes a location
    }
  }

  function mutateRule()                                                         // Called if mutatation is enabled
  {
    if      (STEPFLAG)                             return                       // Not while stepping
    else if (MUTATECT++ < (FPS + 1) * MUTATEDELAY) return                       // wait for the count to be ready...

    let x, y, p, q, n

    MUTATECT  = 0
    MT        = MUTATEDELAY + 1
    DIDPRESET = false

    while (true)                                                                // Randomly select 2 swap locations for a rule
    {
      x =                              rand(LEN1)
      y =                              rand(LEN2)
      p = LIMIT ? rand(min(LEN2, 2)) : rand(LEN2)
      q = LIMIT ? rand(min(LEN1, 2)) : rand(LEN1)
      n =                              rand(2) * 2

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
    if (SHOWN) return updateControls()                                          // Already created, only the controls etc need updating

    let j,

        s = ''

    s += "<table style='border:1px solid #00f; margin:5px; background:#004; " +
         "opacity:.8'><tr><td><table style='border:none' width=340>"

    if (CATYPE == 0)
    {
      s += "<tr id='titleBar'><th style='height:20px; background:#008; color" +
           ":#8f8; border:1px solid #008; font-size:16px; text-align:center'" +
           "><b>Nixon's Kreechers</b></th><th><button style='color:#8f8' "       +
           "onclick='quickGuide()'><u>Q</u>uick Reference Guide</button></b>" +
           "</span></div></th></tr><tr><th colspan=2></th></tr>"

      s += "<tr><td colspan=2><select onmousedown='NOMOVE=true' onchange='"   +
           "chooseSim(this.value)'><option selected value=0>Choose Simulat"   +
           "ion: Currently Kreechers</option><option value=1>Play the Game "  +
           "of Life</option><option value=2>Run Wolfram's 256 Cellular "      +
           "Automata</option></select></td></tr>"
    }
    else if (CATYPE == 1)
    {
      s += "<tr id='titleBar'><th style='height:20px; background:#008; color" +
           ":#8f8; border:1px solid #008; font-size:16px; text-align:center'" +
           "><b>Conway's Life</b></th><th><button style='color:#8f8' onclick" +
           "='quickGuide()'><u>Q</u>uick Reference Guide</button></b></span>" +
           "</th></tr><tr><th colspan=2></th></tr>"

      s += "<tr><td colspan=2><select onmousedown='NOMOVE=true' onchange='"   +
           "chooseSim(this.value)'><option value=0>Run Kreechers</option>"    +
           "<option selected value=1>Choose Simulation: Currently The Game "  +
           "of Life</option><option value=2>Run Wolfram's 256 Cellular Autom" +
           "ata</option></select></td></tr>"
    }
    else if (CATYPE == 2)
    {
      s += "<tr id='titleBar'><th style='height:20px; background:#008; color" +
           ":#8f8; border:1px solid #008; font-size:16px; text-align:center'" +
           "><b>Wolfram's Rules</b></th><th><button style='color:#8f8' "      +
           "onclick='quickGuide()'><u>Q</u>uick Reference Guide</button></b>" +
           "</span></div></th></tr><tr><th colspan=2></th></tr>"

      s += "<tr><td colspan=2><select onmousedown='NOMOVE=true' onchange='"   +
           "chooseSim(this.value)'><option value=0>Run Kreechers</option>"    +
           "<option value=1>Play the Game of Life</option><option selected "  +
           "value=2>Choose Simulation: Currently Wolfram's CA</option>"       +
           "</select></td></tr>"
    }

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

    if (CATYPE == 0)
    {
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
    }
    else if (CATYPE == 1)
    {
      s += "</tr><tr><th colspan=2></th></tr>"

      s += "<tr><td style='color:#99f'><i>Original Game of Life Rules:"       +
           "</i></td><td align=right style='color:#99f'><i><span style='"     +
           "color:#9f9'>3</span> &nbsp; &amp; &nbsp; <span style='color:"     +
           "#f99'>0, 1, 4, 5, 6, 7, 8&nbsp;</span></i></th></tr>"

      s += "<tr><td>Create new particle if any of these numbers of neighbors" +
           ":</td><td align=right><span style='padding-right:3px; color:#9f9" +
           "'><div class=checknum>0</div><div class=checknum>1</div><div "    +
           "class=checknum>2</div><div class=checknum>3</div><div class=chec" +
           "knum>4</div><div class=checknum>5</div><div class=checknum>6"     +
           "</div><div class=checknum>7</div><div class=checknum>8</div>"

      s += LIFECENT ? "<div class=checknum>9</div>" : ""

      s += "</span><br>"

      for (j = 0 ; j < (LIFECENT ? 10 : 9) ; ++j)
      {
        s += "<input type=checkbox " + (VLIFEB[j] ? "checked " : "")          +
             "onclick='VLIFEB[" + j + "] ^= 1; SHOWN = false'>"
      }

      s += "</span></td></tr>"

      s += "<tr><td>Delete particle if any of these numbers of neighbors:"    +
           "</td><td align=right><span style='padding-right:3px; color:#f99'" +
           "><div class=checknum>0</div><div class=checknum>1</div><div "     +
           "class=checknum>2</div><div class=checknum>3</div><div class=chec" +
           "knum>4</div><div class=checknum>5</div><div class=checknum>6"     +
           "</div><div class=checknum>7</div><div class=checknum>8</div>"

      s += LIFECENT ? "<div class=checknum>9</div>" : ""

      s += "</span><br>"

      for (j = 0 ; j < (LIFECENT ? 10 : 9) ; ++j)
      {
        s += "<input type=checkbox " + (VLIFED[j] ? "checked " : "")          +
        "onclick='VLIFED [" + j + "] ^= 1; SHOWN = false'>"
      }

      s += "</span></td></tr>"

      s += "</tr><tr><th colspan=2></th></tr>"

      s += "<tr><td>Include Central Cell (Self)</td><td data-title='There "   +
           "are subtle differences when the central cell is counted, and "    +
           "the number of neighbors can be up to nine' align=right><label "   +
           "class=switch><input onclick='lifeCentral()' type=checkbox "       +
           (LIFECENT ? "checked" : "") + "><span class='slider round'>"       +
           "</span></label></td></tr>"
    }

    s += "<tr ><td><u>G</u>uide Window</td><td data-title='Hides &amp; "      +
         "displays the bottom-left window - when the frame rate is slow, "    +
         "hiding the guide can improve animation speed' align=right><label "  +
         "class=switch><input onclick='setGuide()' type=checkbox " + (GUIDE   ?
         "checked" : "") + "><span class='slider round'></span></label>"      +
         "</td></tr>"

    s += "<tr><td><u>T</u>oggle Color / Monochrome</td><td data-title='"      +
         "Choose between colored or monochrome particles - monochrome is "    +
         "faster but offers much less to see' align=right><label class="      +
         "switch><input onclick='monoColor()' type=checkbox " + (MONO         ?
         "checked" : "") + "><span class='slider round'></span></label>"      +
         "</td></tr>"

    s += "<tr><td><u>P</u>ause (then <u>S</u> to Step)</td><td data-title='"  +
         "Select Pause then use the S key to step through animation frame by" +
         " frame' align=right><label class=switch><input onclick='setStep()'" +
         " type=checkbox " + (STEP ? "checked" : "") + "><span class='slider" +
         " round'></span></label></td></tr>"

    if (CATYPE == 0)
    {

      s += "<tr><th colspan=2></th></tr>"

      s += "<tr><td>Columns: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "      +
           "&nbsp; &nbsp;&thinsp; <span class=keys><u>1</u> &hellip; <u>9"    +
           "</u></span></td><td align=right data-title='More columns brings " +
           "more complexity'><input oninput='LEN1=int(this.value); "          +
           "setRules()' type=range min=1 max=9 value=" + LEN1 + "></td></tr>"

      s += "<tr><td>Rows: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"   +
           "&thinsp;<span class=keys><u>Shift</u>-<u>1</u> &hellip; <u>9</u>" +
           "</span></td><td align=right data-title='More rows increases "     +
           "complexity'><input oninput='LEN2=int(this.value); setRules()' "   +
           "type=range min=1 max=9 value=" + LEN2 + "></td></tr>"
    }
    else if (CATYPE == 1)
    {
      s += "</tr><tr><th colspan=2></th></tr>"
    }
    else if (CATYPE == 2)
    {
      s += "<tr><th colspan=2></th></tr>"

      s += "<tr><td>Rule Number: <span style='font-family:monospace; color:#" +
           "ff0'>" + WOLFRULE.toString().padStart(3,'0') + "</span> &nbsp;"   +
           "&nbsp;<span class=keys><u>[</u> &hellip; <u>]</u></span></td>"    +
           "<td data-title='Odd numbered rules generally fill the screen "    +
           "with solid lines - hold the mouse button down and wiggle the "    +
           "mouse to see the most interesting results - rule 18 is the "      +
           "first complete pattern' align=right><input oninput='setWolfRule"  +
           "(int(this.value)" + ")' type=range min=0 max=255 value="          +
           WOLFRULE + "></td></tr>"

      s += "<tr><td><u>V</u>ertical Offset: <span style='font-family:mono"    +
           "space; color:#ff0'>" + (WOLFOFFSET - 1) + "</span> </td><td data" +
           "-title='The vertical offset controls whether there is a down-"    +
           "wards, upwards, or a level directional flow - switching offsets " +
           "during animation in high resolution modes has quite interesting " +
           "effects' align=right><input oninput='setWolfOffset(int(this."     +
           "value))' type=range min=0 max=2 value=" + WOLFOFFSET + "></td>"   +
           "</tr>"
    }

    s += "<tr><td>Change Resolution &nbsp;<span class=keys><u>&lt;</u>"       +
         " &hellip; <u>&gt;</u></span></td><td data-title='Changing to a "    +
         "lower resolution (to the right) substantially increases the "       +
         "animation frame rate, while higher resolutions (to the left) "      +
         "offer much more detail, at the expense of speed' align=right>"      +
         "<input oninput='setRes(int(this.value))' type=range min=1 "         +
         "max=9 value=" + RSLTN + "></td></tr>"

    s += "</tr><tr><th colspan=2></th></tr>"

    s += "<tr><td align=middle><button data-title='Draws a random line of "   +
         "particles in the current view - you can manually draw a line any"   +
         "where you want by holding down Ctrl, left-clicking, dragging and "  +
         "releasing the mouse' onclick='randomLine()' style='width:100%'>"    +
         "Random <u>L</u>ine</button></td>"

    if (CATYPE == 0)
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
         "with particles spelling the word Kreechers' onclick='writeKreecher" +
         "s()' style='width:100%'><u>W</u>rite 'Kreechers'</td><td align="    +
         "middle><button data-title='Copies the current rule set and parti"   +
         "cle locations into the keyboard buffer for pasting into the preset" +
         "s.js file - Replace the data string at the end with a pair of "     +
         "quotes to just save the rule set' onclick='makeCode()' style='"     +
         "width:100%'>Copy Preset to <u>K</u>bd.</td></tr>"

    s += "<tr><td align=middle><button onclick='doEditmode()' data-title='"   +
         "Tips: You can also enter Edit Mode by Shift-Clicking in the "       +
         "window; Hold down Shift while editing to pan &amp zoom; Right "     +
         "click erases; Esc restores previous settings' style='width:100%"    +
         (EDITMODE ? ";background:#800'><i>Edit Mode - <i>Esc to Exit</i>"    :
         ";background:#080'><i>Enter Edit Mode") + "</i></td><td align="      +
         "middle><button data-title='Hides this details display &ndash; "     +
         "press D to restore - Tip: Use a mouse scroll wheel or touchpad to " +
         "zoom in and out, and the mouse to pan - you can also drag this "    +
         "display around to locate it elsewhere' onclick='setInfo()' style='" +
         "width:100%'>Hide/Restore <u>D</u>etails</td></tr>"

    dwin.innerHTML = s + "</table></td></tr></table>"                           // Writes into the div
    SHOWN = true                                                                // Prevent the sliders etc being redrawn every frame
  }
}

function lifeCentral()
{
  LIFECENT ^= true
  SHOWN     = false
}

dwin.addEventListener('mousedown', e =>                                         // The info window was clicked
{
  if (!INFO.d && !NOMOVE)                                                       // NOMOVE is set by the Choose Simulation input
  {                                                                             // To disable the dragging action
    INFO.d = true                                                               // Set a flag to indicate state
    INFO.l = dwin.offsetLeft                                                    // Store left and top of window
    INFO.t = dwin.offsetTop
    INFO.x = e.pageX                                                            // Store current mouse pointer x,y position
    INFO.y = e.pageY
  }
})

dwin.addEventListener('mousemove', e =>                                         // The mouse has been moved so update position
{
  let p = CANVW - titleBar.offsetWidth - 18,
      q = CANVH - dwin.offsetHeight + 1,

      l = INFO.l + e.pageX - INFO.x,                                            // Find offset between window start and currect mouse
      t = INFO.t + e.pageY - INFO.y                                             // cursor x,y location

  EPAGEX = e.pageX
  EPAGEY = e.pageY

  if (!EDITMODE && e.pageX < (BWIDTH  * RSLTN) &&                               // Only accept values within the canvas
                   e.pageY < (BHEIGHT * RSLTN))
  {
    PAGEX = floor(e.pageX / RSLTN + canvas.offsetLeft - 2)
    PAGEY = floor(e.pageY / RSLTN)
  }

  if (INFO.d)
  {
    if (l <  2) l =  2                                                          // Adjust the offset to fit the window inside the canvas
    if (l >  p) l =  p
    if (t < -9) t = -9
    if (t >  q) t =  q

    dwin.style.left = l + 'px'                                                  // Move the window accordingly
    dwin.style.top  = t + 'px'
  }

  updateTopLeft()                                                               // After zooming the top left will have changed
  cancelAll(e)
})

dwin.addEventListener('mouseup', e =>                                           // The mouse has been released
{
  INFO.d = false                                                                // No more window moving so reset flag
  NOMOVE = false

  cancelAll(e)
})

function chooseSim(s)                                                           // Which one are we switching to?
{
  switch(int(s))
  {
    case 0: playKreechers(); break
    case 1: playLife();      break
    case 2: playWolf();      break
  }
}

function setWolfRule(r)                                                         // Keep the rule in bounds
{
  if (r < 0)   r = 0
  if (r > 255) r = 255

  WOLFRULE = r
  SHOWN    = false
}

function setWolfOffset(o)                                                       // Set the vertical rule application offset
{
  WOLFOFFSET = o
  SHOWN      = false
}

function changeWolfOffset()                                                     // Supports using the V key to cycle the offset
{
  --WOLFOFFSET

  if (WOLFOFFSET < 0) WOLFOFFSET = 2
  SHOWN = false
}

function buildWolfram()                                                         // Generate the Wolfram rules array contents
{
  let j, b, r, s, t

  for (j = 0 ; j < 256 ; ++j)                                                   // There are 256 rules
  {
    s = reverse(j.toString(2).padStart(8,0))                                    // Build a binary string of each

    for (b = 0 ; b < 8 ; ++b)                                                   // Create the 8 sets of triplets
    {
      t = b.toString(2).padStart(3,0)                                           // Pad preceding with zeros

      for (r = 0 ; r < 3 ; ++r)                                                 // Populate the rules array with rule & triplets
        WOLFRAM[j][b][r] = int(t.charAt(r))

      WOLFRAM[j][b][3] = int(s.charAt(b))                                       // And add the action for each rule
    }
  }
}

function updateWorld()                                                          // Choose the version of CA to update
{
  if      (CATYPE == 0) updateKreechers()
  else if (CATYPE == 1) updateLife()
  else if (CATYPE == 2) updateWolfram()
}

function updateWolfram()
{
  let j, k, m, p, t, x, y, y1, y2

  if      (WOLFOFFSET == 2)                                                     // Rules are applied to the row below
  {
    y1 = 0,                                                                     // Results in display when mousebutton is held
    y2 = BHEIGHT - 2                                                            // Flowing down
  }
  else if (WOLFOFFSET == 1)                                                     // Rules are applied ot the current row
  {
    y1 = 0                                                                      // Results in display when mouse button is held and dragged
    y2 = BHEIGHT                                                                // flowing behind the mouse
  }
  else if (WOLFOFFSET == 0)                                                     // Rules are applied to the preceding row
  {
    y1 = 1                                                                      // Results in display when mousebutton is held
    y2 = BHEIGHT                                                                // Flowing upwards
  }

  for (x = 0 ; x < BWIDTH - 2 ; ++x)                                            // For each x location
    for (y = y1 ; y < y2 ; ++y)                                                 // Scan a vertical column
      CONT1: for (j = 0 ; j < 8 ; ++j)                                          // For each triplet in this rule
        CONT2: for (k = 0, m = 0, p = j * 10 + 1 ; k < 3 ; ++k)                 // Does it match the current location?
        {
          if (WOLFRAM[WOLFRULE][j][k] == sign(WORLD[x + k][y])) ++m             // This one of three does so keep count
          else                                                  break CONT2     // This one doesn't, so move onto the next triplet

          if (m == 3)                                                           // All three parts matched
          {
            WORLD2[x + 1][y + WOLFOFFSET - 1] = WOLFRAM[WOLFRULE][j][3] ? p : 0 // So apply the result of the rule to WORLD2
            break CONT1                                                         // No need to check more rules, so move to next location
          }
        }

  t      = WORLD                                                                // Swap the current with the newly created world
  WORLD  = WORLD2
  WORLD2 = t
}

function updateLife()                                                           // Conway's Game of Life
{
  let m, n, n1, n2, n2a, n3, n3a, t, y,

      x = 0

  while (x < BWIDTH)                                                            // Maybe 5% faster in some cases than a for loop...
  {
    y = 0

    WORLD2[x].fill(0)                                                           // Assume most cells to be zero - this is a quicker fill
                                                                                // Than setting zeros separately in the loops
    n1  =   (WORLD[wrapX(x - 1)][wrapY(y - 1)] ? 1 : 0) +                       // Count neighbors above
            (WORLD[      x     ][wrapY(y - 1)] ? 1 : 0) +
            (WORLD[wrapX(x + 1)][wrapY(y - 1)] ? 1 : 0)
    n2  =   (WORLD[wrapX(x - 1)][      y     ] ? 1 : 0) +                       // ... and neighbors in this row
            (WORLD[wrapX(x + 1)][      y     ] ? 1 : 0)

    while (y < BHEIGHT)
    {
      n2a = (WORLD[      x     ][      y     ] ? 1 : 0)                         // Anything in the current center cell?
      n3  = (WORLD[wrapX(x - 1)][wrapY(y + 1)] ? 1 : 0) +                       // Count neighbors below
            (WORLD[wrapX(x + 1)][wrapY(y + 1)] ? 1 : 0)
      n3a = (WORLD[      x     ][wrapY(y + 1)] ? 1 : 0)                         // To be center cell next iteration of y

      m  = WORLD[x][y]                                                          // Is the current cell occupied?
      n  = n1 + n2 + n3 + n3a + (LIFECENT ? n2a : 0)                            // Saves duplicate calculations (don't forget n3a), and...
                                                                                // ...include central cell if set
      n1 = n2 + n2a                                                             // Save the count... (remember n2a)
      n2 = n3                                                                   // ...upwards (ignoring n3a)

      if      ( m && !VLIFED[n]) WORLD2[x][y] = m + .05                         // A small value to cycle colors slower than a value of 1
      else if (!m &&  VLIFEB[n]) WORLD2[x][y] = 1                               // There are the correct number of neighbors

      y++                                                                       // Post increment may be 1-2% faster in some cases
    }
    x++
  }

  t      = WORLD                                                                // Swap the current with the newly created world
  WORLD  = WORLD2
  WORLD2 = t

  function wrapX(x)                                                             // Wrap X cordinates for boundaryless world
  {
    if      (x <  0     )  x += BWIDTH
    else if (x >= BWIDTH)  x -= BWIDTH

    return x
  }

  function wrapY(y)                                                             // Wrap Y cordinates for boundaryless world
  {
    if      (y <  0      ) y += BHEIGHT
    else if (y >= BHEIGHT) y -= BHEIGHT

    return y
  }
}

function updateKreechers()                                                         // The variations of Kreechers
{
  let k, x, y, r, s, t1, t2, rx1, rx2, ry1, ry2,

      j  = 0,
      j1 = MULTIPASS ? LEN1 : 1,                                                // Offsets if multiple passing
      k1 = MULTIPASS ? LEN2 : 1

  do                                                                            // These first two loops only apply
  {
    k = 0

    do                                                                          // If doing multiple passes
    {
      x = j

      while (x < j + (HARDB ? BWIDTH - LEN1 : BWIDTH + LEN1))                   // Pass over the world's x
      {                                                                         // In this instance while loops seem about 5% faster
        y = k                                                                   // than for, for some reason

        while (y < k + (HARDB ? BHEIGHT - LEN2 : BHEIGHT + LEN2))               // Pass over the world's y
        {
          r = 0

          while (r < LEN1)                                                      // Pass ovet the matrix x
          {
            s = 0

            while (s < LEN2)                                                    // Pass over the matrix y
            {
              if (WORLD[(x + r) % BWIDTH][(y + s) % BHEIGHT])                   // Test loaction (including wrapping)
              {
                rx1 = (x + RULES[r][s][1] + LENX1) % BWIDTH                     // Get locations from current rules
                ry1 = (y + RULES[r][s][0] + LENY1) % BHEIGHT
                rx2 = (x + RULES[r][s][3] + LENX1) % BWIDTH
                ry2 = (y + RULES[r][s][2] + LENY1) % BHEIGHT

                if (t1 = WORLD[rx1][ry1]) ++t1                                  // Get particle infor using rule locations
                if (t2 = WORLD[rx2][ry2]) ++t2                                  // Increment if exists for color changing

                if (!STEPFLAG && t1 != t2)                                      // If we aren't stepping and the locations are different
                {
                  if (TRACK) WORLD2[rx1][ry1] = 1                               // Leave a trace if a swap was made

                  WORLD[rx1][ry1] = t2                                          // Swap the two loactions
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
    } while (++k < k1)
  } while (++j < j1)
}

function drawWorld()                                                            // Rendering routine allowing
{                                                                               // for zooming, panning, and other features
  let lx, xp, w, y, yq, ty,

      x = 0,
      c = 0

  const p  = SCALEX  * RSLTN,
        q  = SCALEY  * RSLTN,
        wq = BWIDTH  * RSLTN,
        hq = BHEIGHT * RSLTN,
        bh = BHEIGHT * .8,
        bw = BWIDTH  * .8,

        ofx = floor(OFFSETX),
        ofy = floor(OFFSETY),

        h = floor(bh - p - 2)         - ofy,
        i = floor(BWIDTH / 5 + q + 2) - ofx * 1.8,

        d1 = TIME % 13,
        d2 = TIME % 7,

        cx1 = CONTROL.x1 - LEFT,
        cx2 = CONTROL.x2 - LEFT,
        cx3 = CONTROL.x2 - CONTROL.x1,
        cy1 = CONTROL.y1 - TOP,
        cy2 = CONTROL.y2 - TOP,
        cy3 = CONTROL.y2 - CONTROL.y1,

        a  = FPS < 15 ? floor(p + 1 ) : p + 1,
        b  = FPS < 15 ? floor(q + 1 ) : q + 1,

        p2 = p / 2,
        q2 = q / 2,

        op2 = ofx - p2,
        oq2 = ofy - q2,
        ocp = ofx + cx1 * p,
        o2p = ofx + cx2 * p,
        p1p = op2 + cx1 * p,
        p2p = op2 + cx2 * p,
        o3p = ofx + cx3 * p,
        of1 = ofy + cy1 * q,
        of2 = ofy + cy2 * q,
        of3 = ofy + cy3 * q,
        cq1 = oq2 + cy1 * q,
        cq2 = oq2 + cy2 * q,

        bcx1 = ALT.x1 - LEFT,
        bcx3 = ALT.x2 - ALT.x1,
        bcy1 = ALT.y1 - TOP,
        bcy3 = ALT.y2 - ALT.y1,

        bocp = ofx + bcx1 * p,
        bo3p = ofx + bcx3 * p,
        bof1 = ofy + bcy1 * q,
        bof3 = ofy + bcy3 * q

  CONTEXT.fillStyle = '#102'                                                    // World background color
  CONTEXT.fillRect(0, 0, wq, hq)                                                // Clear the canvas
  CONTEXT.fillStyle = COLORS[1]

  while (x < WIDTH)                                                             // Process through current world view, x first
  {                                                                             // While seems faster than for
      y  = 0
      lx = LEFT + x
      xp = floor(ofx + (x++ * p))

    while (y < HEIGHT)                                                          // Then y
    {
      yq = floor(y * q)
      ty = TOP + y++

      if (w = ceil(WORLD[lx][ty]))                                              // Found a particle?
      {
        if (!MONO && c != w) CONTEXT.fillStyle = COLORS[(c = w) % 256]          // Change color, but only if different to last time

        CONTEXT.fillRect(xp, floor(ofy + yq), a, b)                             // Draw the particle
      }
      else if (TRACK && !LCLICK && !RCLICK && (WORLD2[lx][ty]))                 // Is tracking on?
      {
        CONTEXT.fillStyle = COLORS[c = 8]
        CONTEXT.fillRect(xp, ofy + yq, 1, 1)                                    // Yes so draw dot
      }
    }
  }

  if (CONTROL.f)
  {
    CONTEXT.globalCompositeOperation = 'lighter'                                // Lighter in case of same color
    CONTEXT.setLineDash([d1, d2])
    CONTEXT.lineWidth = p1
    CONTEXT.strokeStyle = '#fff'                                                // Band color
    CONTEXT.beginPath()
    CONTEXT.fillRect(p1p, of1 ,a, b)                                            // Blob at start

    if (CONTROL.f == 1)
    {
      CONTEXT.moveTo(ocp, of1)                                                  // Outline single line rubber band
      CONTEXT.lineTo(o2p, of2)
    }
    else if (CONTROL.f == 2 || CONTROL.f == 3)
    {
      CONTEXT.fillRect(p2p, cq1, a, b)                                          // Blob on corner
      CONTEXT.rect(ocp, of1, o3p, of3)                                          // Outline rectangle rubber band
      CONTEXT.fillRect(p1p, cq2, a, b)                                          // Blob on corner
    }
    if (CONTROL.f == 3)
    {
      CONTEXT.moveTo(ocp, of1)                                                  // Outline single line rubber band
      CONTEXT.lineTo(o2p, of2)
      CONTEXT.moveTo(ocp, of2)                                                  // Outline single line rubber band
      CONTEXT.lineTo(o2p, of1)
    }

    CONTEXT.fillRect(p2p, cq2, a, b)                                            // Blob at end
    CONTEXT.stroke()
    CONTEXT.lineWidth = 1
    CONTEXT.setLineDash([])
    CONTEXT.globalCompositeOperation = 'source-over'
  }

  if (ALT.f)
  {
    CONTEXT.globalCompositeOperation = 'lighter'
    CONTEXT.setLineDash([d1, d2])
    CONTEXT.lineWidth = p1
    CONTEXT.strokeStyle = '#0f0'                                                // Band color
    CONTEXT.beginPath()

    if (ALT.f == 1) CONTEXT.rect(bocp, bof1, bo3p, bof3)                        // Outline rectangle rubber band

    CONTEXT.stroke()
    CONTEXT.lineWidth = 1
    CONTEXT.setLineDash([])
    CONTEXT.globalCompositeOperation = 'source-over'
  }

  if (CATYPE == 0) backtoBin()                                                  // Have the colors restart at 1

  drawSmall()
}

function backtoBin()                                                            // Resets colors of particles
{
  if (STEP) return                                                              // Don't remove color info if stepping

  let x, y

  for (x = 0 ; x < BWIDTH ; ++x)                                                // Restarting at 1 keeps colors consistent and...
    for (y = 0, WORLD2[x].fill(0) ; y < BHEIGHT ; ++y)                          // Zero WORLD2 at the same time
      WORLD[x][y] = WORLD[x][y] ? 1 : 0                                         // All positive values in WORLD become 1
}

function drawSmall()                                                            // Draws a small version of the world in the guide window
{
  let y,

      x = 0

  const h  = CANVH * .8,
        q  = RSLTN / 5,
        q5 = RSLTN * 5,

        lq = LEFT * q,
        tq = TOP  * q,

        mx = PAGEX * q - canvas.offsetLeft,
        my = PAGEY * q + h,

        bhq = CANVH / 5,
        bwq = CANVW / 5,

        wx = (ZOOMLEV == ZOOMCT) ? WIDTH * q -2 : WIDTH * q,
        hy = HEIGHT  * q - 1,

        wx1 = wx * 5 / RSLTN,
        hy1 = hy * 5 / RSLTN

  if (GUIDE && GUIDECT == 0)                                                    // If on and the counter is ready, display the guide window
  {
    GUIDECT = GUIDERATE                                                         // GUIDERATE is the frame delay between redraws

    CONTEXT.fillStyle = EDITMODE ? '#006' : '#204'                              // Fill background of guide window
    CONTEXT.fillRect(1,      h - 1,  bwq, bhq)
    CONTEXT.fillStyle = EDITMODE ? '#205' : '#402'                              // Fill background of selection
    CONTEXT.fillRect(lq + 2, h + tq, wx,  hy)

    while (x < BWIDTH)                                                          // Draw a mini copy of the world
    {
      y = 0

      while (y < BHEIGHT)
      {
        if (WORLD[x][y])
        {
          if (x > (LEFT) && x < (LEFT + wx1) &&
              y > (TOP ) && y < (TOP  + hy1))
                CONTEXT.fillStyle = '#ff0'                                      // Inside selection
          else  CONTEXT.fillStyle = '#888'                                      // Outside selection

          CONTEXT.fillRect(floor(    x / 5 * RSLTN),                            // Draw pixels
                           floor(h + y / 5 * RSLTN), 1, 1)
        }
        y++
      }
      x++
    }

    CONTEXT.strokeStyle = EDITMODE ? '#fff' : '#8af'
    CONTEXT.strokeStyle = EDITMODE ? '#fff' : '#8af'
    CONTEXT.beginPath()
    CONTEXT.rect(lq + 2, h + tq, wx, hy)                                        // Outline selection
    CONTEXT.stroke()

    CONTEXT.strokeStyle = '#fff'
    CONTEXT.beginPath()
    CONTEXT.rect(0, h - 2, bwq + 2, bhq + 2)                                    // Outline guide window
    CONTEXT.stroke()

    TGUIDE = CONTEXT.getImageData(1, h - 2, bwq + 4, bhq + 2)                   // Copy the guide to save recreating it over and over
  }
  else if (GUIDE)
  {
    CONTEXT.strokeStyle = EDITMODE ? '#fff' : '#8af'
    CONTEXT.beginPath()
    CONTEXT.rect(lq + 2, h + tq, wx, hy)                                        // Outline selection
    CONTEXT.stroke()

    CONTEXT.strokeStyle = '#fff'
    CONTEXT.beginPath()
    CONTEXT.rect(0, h - 2, bwq + 2, bhq + 2)                                    // Outline guide window
    CONTEXT.stroke()

    CONTEXT.putImageData(TGUIDE, 1, h - 2)                                      // Paste the copy of the guide to the canvas
    GUIDECT--                                                                   // Count down to the next full redraw
  }

  GUIDERATE = min(floor(160 / min(FPS, 160)), 10)                               // The slower the FPS the less frequently the guide redraws

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
  if (canvas.width != CANVW)
  {
    canvas.width  = CANVW
    canvas.height = CANVH

    canvas.style.border  = 'solid 1px #fff'
    canvas.style.opacity = 1
  }

  CANV.rpl = canvas.requestPointerLock || canvas.mozRequestPointerLock          // For requesting a pointer lock on the cursor
}

function clearWorld(n = 0)                                                      // Empties the world of all particles
{
  let x = MAXWIDTH - 1

  if (n == 0) while (x >= 0) WORLD[ x--].fill(0)
  else        while (x >= 0) WORLD2[x--].fill(0)
}

function editCursor()                                                           // Keeps the edit cursor updated
{
  if (MOUSEY < HEIGHT) editcursor.style.display = 'block'
  else                 editcursor.style.display = 'none'
}

function randomOpenRectangle()                                                  // Draws a random open rectangle of particles in the world
{
  rectangle(rand(WIDTH), rand(HEIGHT),
            rand(WIDTH), rand(HEIGHT), RCLICK ? 0 : 1)
}

function randomFilledRectangle()                                                // Draws a random filled rectangle in the world
{
  filledRectangle(rand(WIDTH), rand(HEIGHT),
                  rand(WIDTH), rand(HEIGHT), RCLICK ? 0 : 1)
}

function randomLine()                                                           // Draws a random line of particles in the world
{
  line(rand(WIDTH), rand(HEIGHT),
       rand(WIDTH), rand(HEIGHT), RCLICK ? 0 : 1)
}

function line(x1, y1, x2, y2, c = 1)                                            // Draws a line of particles in the world
{
  x1 += LEFT
  y1 += TOP
  x2 += LEFT
  y2 += TOP

  const dx = abs( x2 - x1),
        dy = abs( y2 - y1),
        sx = sign(x2 - x1),
        sy = sign(y2 - y1)

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
  let j = x1,
      d = sign(x2 - x1)

  while (j != x2)
  {
    line(j, y1, j, y2, c)

    j += d                                                                      // Either + or - according to +ve or -ve value
  }
}

function makeCode()                                                             // Creates a preset suitable for adding to presets.js
{
  let j, x, y,
      c = '[' + CATYPE + ',',                                                   // Preset header with the type of Kreecher, which for...
      o = ''

  if (CATYPE == 0)                                                              // ...type 0 is Kreechers
  {
    c += LEN1 + ','  + LEN2 + ',' + sign(LIMIT) + ','                           // the width and height of the rule matrix
                                                                                // And whether rules are limited to a 2x2 section
    for (x = 0 ; x < LEN1 ; ++x)                                                // Extracts the rule set into c
      for (y = 0 ; y < LEN2 ; ++y)
        for (j = 0 ; j < 4 ; ++j)
          c += RULES[x][y][j] + ','
  }
  else if (CATYPE == 1)                                                         // Type 1 is Life
  {
    c += LIFECENT + ','

    for (x = 0 ; x < 10 ; ++x)
      c += (VLIFEB[x] ? '1' : '0') + ','                                        // The create rules

    for (x = 0 ; x < 10 ; ++x)
      c += (VLIFED[x] ? '1' : '0') + ','                                        // The remove rules
  }
  else if (CATYPE == 2)                                                         // Type 2 is Wolfram
  {
    c += WOLFRULE + ',' + WOLFOFFSET + ','                                      // Just two items to store here
  }

  c += BWIDTH.toString()  + ',' + BHEIGHT.toString() + ',' + "'"                // Canvas width and height

  for (x = 0 ; x < BWIDTH ; ++x)                                                // Convert WORLD to integers then strings
    for (y = 0 ; y < BHEIGHT ; ++y)
      o += floor(WORLD[x][y]).toString().padStart(3, '0')                       // Store the data as string triplets
                                                                                // So that it is easily compressible
  copyText(c + o.compress() + "'],\n")                                          // Copies the compressed preset to the keyboard buffer
}

function decodeWorld(s, w, h)                                                   // Unpacks the above and applies it
{
  let d, j, x, y,

      p = 0,
      q = 0

  setRes(floor(CANVW / w))                                                      // Make the resolution just big enough for the content

  d = s.decompress()                                                            // Decompress to string triplets

  if (BWIDTH  > w) p = floor((BWIDTH  - w) / 2)
  if (BHEIGHT > h) q = floor((BHEIGHT - h) / 2)

  for (x = 0, j = 0 ; x < w ; ++x)
    for (y = 0 ; y < h ; ++y, j += 3)
      WORLD[x + p][y + q] = int(d.substring(j, j + 3))
}

function copyText(text)                                                         // This saves to the clipboard
{
  if (!navigator.clipboard) return copyTextAlt(text)
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

function monoColor()                                                            // Switch between mono & color
{
  MONO ^= true
  SHOWN = false
}

function playKreechers()                                                           // Switch to playing Kreechers
{
  CATYPE = 0
  SHOWN     = false

  mwin.style.display = 'block'
  clearActions()
}

function playLife()                                                             // Switch to playing Life
{
  VLIFEB = [0, 0, 0, 1, 0, 0, 0, 0, 0, 0]                                       // Standard - final element is center cell
  VLIFED = [1, 1, 0, 0, 1, 1, 1, 1, 1, 0]                                       // Life rules - counted if switch is et

  CATYPE = 1
  LIFECENT  = false
  SHOWN     = false

  mwin.style.display = 'none'
  clearWorld(1)
  clearActions()
}

function playWolf()                                                             // Set up all the variables to play Wolfram rules
{
  let j

  for (j = 0 ; j < BWIDTH  ; ++j)
  {
    WORLD[j][0          ] = 0
    WORLD[j][BHEIGHT - 1] = 0
  }

  for (j = 0 ; j < BHEIGHT ; ++j)
  {
    WORLD[0         ][j] = 0
    WORLD[BWIDTH - 1][j] = 0
  }

  CATYPE = 2
  SHOWN     = false

  mwin.style.display = 'none'
  clearWorld(1)
  clearActions()
}

function updateControls()                                                       // Update the info section of the display window
{
  const n  = LEN1 * LEN2,
        mt = floor(15.9 - MUTATECT / FPS),
        p  = PRESET == 0 ? PRESETS.length : PRESET,
        q  = (PRESET == PRESETS.length - 1) ?
                        PRESETS.length : (PRESET + 1) % PRESETS.length,
        r  = LIMIT ? 7 : n * (n - 1) / 2 + 1

  let t = r ** n

  if (mt < MT) MT = mt

  t = t.toExponential(2).toString()
  t = t.substr(0, 4) + " &times; 10<sup>" + t.substr(6) + "</sup>"

  i0.innerHTML = ceil((ZOOMLEV / ZOOMCT * 100)) + "% (" +
                 WIDTH + " &times; " + HEIGHT + ")"
  i1.innerHTML = DIDPRESET? p + " of " + PRESETS.length :
                 "None (Next is " + q + " of " + PRESETS.length + ")"
  i3.innerHTML = ((STEP || EDITMODE || LCLICK || RCLICK) ? 0 : FPS) + " FPS"

  if (CATYPE == 0)
  {
    i2a.innerHTML = MUTATE ? "Next Mutation in..." : "Not Mutating"
    i2b.innerHTML = MUTATE ? (MT + " seconds") : "<i>Not Mutating</i>"
    i4.innerHTML  = LEN1 + " &times; " + LEN2
    i5.innerHTML  = n
    i6.innerHTML  = r.toLocaleString()
    i7.innerHTML  = r + "<sup>" + n + "</sup> = " + t
  }
}

function showRules()                                                            // Displays the rules matrix
{
  if (CATYPE != 0) return                                                       // But only for Kreechers

  let c, x, y, p, q, s

  const c1 = ',2)">&FilledSmallSquare;',                                        // Placing all the variables here removes a messy
        c2 = ',2)">&EmptySmallSquare;',                                         // tangle from the loops
        l1 = floor(LEN1 / 2),                                                   // It's still quite obscure code, though, but fairly fast
        l2 = floor(LEN2 / 2),
        s1 = "<table id=matrix style='border:1px ",
        s2 = "solid #00f;background:#004;opacity:.8'>",
        s3 = "</table style='background:#008'></td>",
        s4 = '<td align=center><table',
        s5 = ' bgcolor=#22a',
        s6 = ' bgcolor=#f00',
        s7 = '>',
        s8 = '</tr>',
        s9 = '<tr>',
        sa = '</div></td>',
        sb = '<td class="cell" valign=middle',
        sc = ' style="background:#08f;color:#ff0"',
        sd = '><div style="margin-top:-3px; width:18px; margin-left:-2px" ',
        se = 'onclick="setRule(',
        sf = '</table>'

  for (y = 0, s = s1 + s2 ; y < LEN2 ; ++y, s += s8)
  {
    for (x = 0, s += s9 ; x < LEN1 ; ++x, s += s3)
    {
      s += s4

      if (MUTATED.f && MUTATED.x == x && MUTATED.y == y) s += s5
      if (LIMIT && (x == l1 || (x == l1 - 1)) &&
                   (y == l2 || (y == l2 - 1)))           s += s6

      for (p = 0, s += s7 ; p < (LIMIT ? min(LEN2, 2) : LEN2) ; ++p, s += s8)
      {
        for (q = 0, s += s9 ; q < (LIMIT ? min(LEN1, 2) : LEN1) ; ++q, s += sa)
        {
          c = sb

          if (MUTATED.f && MUTATED.x == x && MUTATED.y == y)
            if (MUTATED.p == p && MUTATED.q == q ||
                MUTATED.r == p && MUTATED.s == q) c += sc

          c += sd + se + x + ',' + y + ',' + p + ',' + q + ','

          if ( RULES[x][y][0] == p && RULES[x][y][1] == q ||
               RULES[x][y][2] == p && RULES[x][y][3] == q) s += c + 2 + c1
          else                                             s += c + 0 + c2
        }
      }
    }
  }

  mwin.innerHTML = s + sf                                                       // Output the HTML table
}

function setRule(x, y, p, q, r, s)                                              // Sets a single Kreecher rule
{
  RULES[x][y][r    ] = p
  RULES[x][y][r + 1] = q

  if (s)
  {
    if (s == 2) MUTATED.f = false

    showRules()
  }
}

function setRules()                                                             // Sets a random set of Kreecher rules
{
  let j, x, y, z

  if (CATYPE == 1)                                                              // Life
  {
    for (j = 0 ; j < 10 ; ++j)
    {
      VLIFEB[j] = rand(2)                                                       // Random create rules
      VLIFED[j] = rand(2)                                                       // Random remove rules
    }

    SHOWN = false
    return
  }
  else if (CATYPE == 2) return                                                  // Not Wolfram

  LENX  = floor(LEN1 / 2)                                                       // Kreechers
  LENY  = floor(LEN2 / 2)                                                       // Half the dimensions of the Kreecher matrix
  LENX1 = LIMIT ? LENX : 0                                                      // Uses for selecting the most central 2x2 section
  LENY1 = LIMIT ? LENY : 0                                                      // Only applied if LIMIT is true

  for (x = 0 ; x < LEN1 ; ++x)
    for (y = 0 ; y < LEN2 ; ++y)
      for (z = 0 ; z < 2 ; ++z)
        setRule(x, y, (LIMIT ? rand(min(LEN2, 2)) : rand(LEN2)),
                      (LIMIT ? rand(min(LEN1, 2)) : rand(LEN1)),
                        z * 2, 0)
  MUTATED.f = false
  STEPFLAG  = false
  DIDPRESET = false

  showRules()
}

function writeKreechers()                                                       // Draw app name
{
  const t  = floor(HEIGHT / 5),                                                 // Top line
        m  = floor(HEIGHT / 2),                                                 // Middle line
        a  = floor((m - t) / 2),                                                // Quarter character height
        d  = floor((WIDTH / 1.5) / 7),                                          // Character spacing
        w  = floor(d / 2),                                                      // Character width
        h  = floor(t + a),                                                      // Halfway between top and middle
        j  = floor(m + a),                                                      // Halfway between middle and bottom
        b  = t * 4,                                                             // Bottom line
        K1 = floor(WIDTH / 10),                                                 // K
        K2 = K1 + d,                                                            // r
        K3 = K2 + d,                                                            // e
        K4 = K3 + d,                                                            // e
        K5 = K4 + d,                                                            // c
        K6 = K5 + d,                                                            // h
        K7 = K6 + d,                                                            // e
        K8 = K7 + d,                                                            // r
        K9 = K8 + d                                                             // s

  line(K1,     t, K1,     b)                                                    // K
  line(K1,     m, K1 + w, t)
  line(K1,     m, K1 + w, b)

  line(K2,     m, K2 + w, m)                                                    // r
  line(K2,     m, K2,     b)

  line(K3,     m, K3 + w, m)                                                    // e
  line(K3,     j, K3 + w, j)
  line(K3,     b, K3 + w, b)
  line(K3,     m, K3,     b)
  line(K3 + w, m, K3 + w, j)

  line(K4,     m, K4 + w, m)                                                    // e
  line(K4,     j, K4 + w, j)
  line(K4,     b, K4 + w, b)
  line(K4,     m, K4,     b)
  line(K4 + w, m, K4 + w, j)

  line(K5,     m, K5 + w, m)                                                    // c
  line(K5,     m, K5,     b)
  line(K5,     b, K5 + w, b)

  line(K6,     t, K6,     b)                                                    // h
  line(K6,     m, K6 + w, m)
  line(K6 + w, m, K6 + w, b)

  line(K7,     m, K7 + w, m)                                                    // e
  line(K7,     j, K7 + w, j)
  line(K7,     b, K7 + w, b)
  line(K7,     m, K7,     b)
  line(K7 + w, m, K7 + w, j)

  line(K8,     m, K8 + w, m)                                                    // r
  line(K8,     m, K8,     b)

  line(K9,     m, K9 + w, m)                                                    // s
  line(K9,     m, K9,     j)
  line(K9,     j, K9 + w, j)
  line(K9 + w, j, K9 + w, b)
  line(K9,     b, K9 + w, b)
}

function newPreset()                                                            // Populate the array with the next set of rules
{
  let h, s, x, w, y, z,

      n = 0

  clearActions()

  CATYPE = PRESETS[PRESET][n++]                                                 // Fetch the Kreecher type, then if...

  if (CATYPE == 0)                                                              // Kreechers
  {
    LEN1  = PRESETS[PRESET][n++]                                                // Width, height and whether limited to 2x2
    LEN2  = PRESETS[PRESET][n++]
    LIMIT = PRESETS[PRESET][n++] == 1 ? true : false

    for (x = 0 ; x < LEN1 ; ++x )
      for (y = 0 ; y < LEN2 ; ++y)
        for (z = 0 ; z < 4 ; ++z)
          RULES[x][y][z] = PRESETS[PRESET][n++]                                 // Retrieve the rules

    showRules()                                                                 // Display the new rules (if selected)
    if (DISPLAY)
    {
      mwin.style.display = 'block'
    }
  }
  else if (CATYPE == 1)                                                         // Life
  {
    LIFECENT = PRESETS[PRESET][n++]

    for (x = 0 ; x < 10 ; ++x)
      VLIFEB[x] = PRESETS[PRESET][n++]                                          // Retrieve the create rules

    for (x = 0 ; x < 10 ; ++x)
      VLIFED[x] = PRESETS[PRESET][n++]                                          // Retrieve the remove rules

    mwin.style.display = 'none'                                                 // Don't show the Kreechers matrix
  }
  else if (CATYPE == 2)                                                         // Wolfram
  {
    WOLFRULE   = PRESETS[PRESET][n++]                                           // Just two things to retrive
    WOLFOFFSET = PRESETS[PRESET][n++]

    mwin.style.display = 'none'                                                 // Don't show the Kreechers matrix
  }

  w = PRESETS[PRESET][n++]                                                      // Plus width, height and world data (if any)
  h = PRESETS[PRESET][n++]
  s = PRESETS[PRESET][n++]

  clearWorld()                                                                  // Clear out WORLD

  if (s != '') decodeWorld(s, w, h)                                             // If there's world data decode it
  else         writeKreechers()

  MUTATECT  = 0                                                                 // Reset mutation (if enabled)
  DIDPRESET = true                                                              // We just loaded a preset
  MT        = 16                                                                // Reset the mutation counter
  SHOWN     = false                                                             // The details display needs updating
  MUTATED.f = false                                                             // This is not a mutated rule set

  if (++PRESET >= PRESETS.length) PRESET = 0                                    // Move pointer to next preset ready for subsequent call
}

function changeRes()                                                            // Modify global variables relating to display
{
  WIDTH  =      floor(ZOOMLEV * MODEX)                                          // Determine window width and height
  HEIGHT =      floor(ZOOMLEV * MODEY)
  SCALEX = BWIDTH  / (ZOOMLEV * MODEX)                                          // Work out the scaling factor to enlarge by
  SCALEY = BHEIGHT / (ZOOMLEV * MODEY)

  updateTopLeft()                                                               // Always know where the top left is
}

function updateTopLeft()                                                        // Calculate TOP and LEFT of window
{
  const dl = BWIDTH  - WIDTH,
        dt = BHEIGHT - HEIGHT,

        sx = floor((PAGEX - canvas.offsetLeft) * (dl / BWIDTH)),
        sy = floor((PAGEY - canvas.offsetTop)  * (dt / BHEIGHT))

  LEFT = sx >= dl ? dl : (sx < 0) ? 0 : sx                                      // So that the zoom window is correctly offset
  TOP  = sy >= dt ? dt : (sy < 0) ? 0 : sy
}

canvas.addEventListener('mousedown', doMousedown)                               // The mouse button is down

function doMousedown(e)
{
  if (SHIFT)        doEditmode()                                                // If shift we need to request an edit cursor
  if (e.which == 1) LCLICK = true                                               // Left button pressed
  if (e.which == 3) RCLICK = true                                               // Right button pressed

  doMousemove(e)                                                                // Get latest mouse X/Y so the click registers correctly

  cancelAll(e)                                                                  // Don't pass on this interrupt
  INFO.d = false
}

function doEditmode()                                                           // Lock the mouse pointer and use a second one for editing
{
  if (!EDITMODE)
    if (!(document.pointerLockElement    === canvas||                           // Request a pointer lock to have a new mouse pointer
          document.mozpointerLockElement === canvas)) CANV.rpl()                // For more precise editing
}

cwin.addEventListener('wheel', e =>                                             // Prevent scrolling bubbling to main browser
{
  const y = e.wheelDelta ? e.wheelDelta : -e.deltaY                             // Direction of scroll

  if ((cwin.offsetHeight + cwin.scrollTop) >=                                   // If already maximally scrolled and trying to scroll
                           cwin.scrollHeight && y < 0) cancelAll(e)             // down more, cancel - otherwise, scrolling up is fine
})

canvas.addEventListener('wheel', doZoom)                                        // Wheel or touchpad scroll
mwin.addEventListener(  'wheel', doZoom)                                        // All these elemnts should support zoom of the
dwin.addEventListener(  'wheel', doZoom)                                        // world underneath
iwin.addEventListener(  'wheel', doZoom)

function doZoom(e)                                                              // The mouse wheel has been moved so zoom
{
  const xo = container.offsetLeft + canvas.offsetLeft,
        yo = container.offsetTop  + canvas.offsetTop,

        cx = SCALEX * RSLTN,
        cy = SCALEY * RSLTN,

        cx2 = cx / 2,
        cy2 = cy / 2,

        y = e.wheelDelta  ? e.wheelDelta : -e.deltaY,                           // Direction of zoom
        t = e.wheelDeltaY ? e.wheelDeltaY == -3 *
            e.deltaY      : e.deltaMode   ==  0,                                // Touchpad or mouse?

        m = t ? 1.5 : 32 / RSLTN                                                // Amount to zoom by (less for Touchpad/lower resolutions)

  //clearTimeout(ROTIMEOUT)                                                     // Still zooming, cancel the call to remove the offsets

  cancelAll(e)

  doMousemove(e)                                                                // We need to keep the mouse x,y fresh

  if (!EDITMODE && SHIFT )                                                      // As long as we aren't editing
  {
    PAGEX = e.pageX / RSLTN                                                     // We need copies of these here...
    PAGEY = e.pageY / RSLTN                                                     // ...as well as from onMousemove
  }

  if (sign(y) == 1)                                                             // Scroll forwards
  {
    ZOOMLEV -= ZOOMLEV / ZOOMCT * m                                             // Zoom in, more slowly as we go

    if (ZOOMLEV < 1) ZOOMLEV = 1                                                // Stay in bounds
  }
  else                                                                          // Scroll backwards
  {
    ZOOMLEV += ZOOMLEV / ZOOMCT * m                                             // Zoom out, faster as we go

    if (ZOOMLEV > ZOOMCT) ZOOMLEV = ZOOMCT                                      // Stay in bounds
  }

  changeRes()                                                                   // Update the canvas variables etc

  //OFFSETX = (PAGEX * RSLTN - xo) % cx - cx2                                   // Centers current pixel during
  //OFFSETY = (PAGEY * RSLTN - yo) % cy - cy2                                   // zoom to prevent jitter

  //ROTIMEOUT = setTimeout(removeOffset, 150)                                   // Remove the offests in 150 milliseconds

  //function removeOffset()                                                     // After zooming the offsets aren't wanted
  //{
  //  OFFSETX = 0
  //  OFFSETY = 0
  //}
  INFO.d = false
}

canvas.addEventListener('mousemove', doMousemove)                               // The mouse has been moved so update position
mwin.addEventListener(  'mousemove', doMousemove)                               // When over the canvas, and it's windows...
dwin.addEventListener(  'mousemove', doMousemove)                               // All of these must support mouse move underneath
iwin.addEventListener(  'mousemove', doMousemove)
cwin.addEventListener(  'mousemove', cancelDefaults)

function cancelDefaults(e)                                                      // Stop the event going anywhere else
{
  cancelAll(e)
}

function doMousemove(e)                                                         // Captures mouse movement
{
  EPAGEX = e.pageX
  EPAGEY = e.pageY

  if (!EDITMODE && e.pageX < (BWIDTH  * RSLTN) &&                               // Only accept values within the canvas
                   e.pageY < (BHEIGHT * RSLTN))
  {
    PAGEX = floor(e.pageX / RSLTN + canvas.offsetLeft - 2)
    PAGEY = floor(e.pageY / RSLTN)
  }

  if (EDITMODE)                                                                 // If editing we are using the second pointer
  {
    if (SHIFT)
    {
      PAGEX += e.movementX / 6
      PAGEY += e.movementY / 6
      PAGEX  = max(PAGEX, 0)
      PAGEX  = min(PAGEX, BWIDTH)
      PAGEY  = max(PAGEY, 0)
      PAGEY  = min(PAGEY, BHEIGHT)
    }
    else                                                                        // Otherwise the regular pointer
    {
      EDITX += e.movementX / 6
      EDITY += e.movementY / 6
    }

    MOUSEX                = floor(EDITX / SCALEX)                               // Set the mouse x & y
    MOUSEY                = floor(EDITY / SCALEY)
    editcursor.style.left = EDITX * RSLTN + 'px'                                // And edit cursor x & y
    editcursor.style.top  = EDITY * RSLTN + 'px'
  }
  else
  {
    MOUSEX = floor(e.offsetX / RSLTN / SCALEX)                                  // Locate the mouse
    MOUSEY = floor(e.offsetY / RSLTN / SCALEY)
  }

  updateTopLeft()                                                               // After zooming the top left will have changed
  INFO.d = false
}

canvas.addEventListener('mouseup', e =>                                         // The mouse button is up
{
  const cx1 = floor(CONTROL.x1 - LEFT),
        cy1 = floor(CONTROL.y1 - TOP ),
        cx2 = floor(CONTROL.x2 - LEFT),
        cy2 = floor(CONTROL.y2 - TOP )

  if (CONTROL.s)                                                                // Control is down so draw a shape in the world
  {
    if      (CONTROL.f == 1) line(           cx1, cy1, cx2, cy2)
    else if (CONTROL.f == 2) rectangle(      cx1, cy1, cx2, cy2)
    else if (CONTROL.f == 3) filledRectangle(cx1, cy1, cx2, cy2)
  }

  CONTROL.s = false
  CONTROL.f = false
  ALT.b     = false
  INFO.d    = false
  LCLICK    = false
  RCLICK    = false                                                             // Reset flags
})

window.addEventListener('contextmenu', function(e)                              // Disable pop-up right click menu
{
  e.preventDefault()                                                            // Prevents the default action
})                                                                              // (Not hiding our code, just preventing context menu)

window.addEventListener('keydown', function(e)                                  // A key has been pressed
{
  let code = e.keyCode ? e.keyCode : e.which                                    // Account for different browsers

  if (e.shiftKey) SHIFT     = true                                              // Shift's state is needed in a few places
  if (e.ctrlKey)  CONTROL.s = true                                              // Control is used for rubber banding & copy/cut/paste
  if (e.altKey)   ALT.s     = true                                              // Alt is for selection minipulation

  code = SHIFT     ? code +   1000 : code                                       // Account for the three modifiers
  code = CONTROL.s ? code +  10000 : code
  code = ALT.s     ? code + 100000 : code

  if (EDITMODE)
  {
    if (code == 81) quickGuide()                                                // Only the [Q]uick Menu can be called for assistance
    return                                                                      // during Edit Mode, all other keys are disabled
  }

  if (CATYPE == 0)
  {
    switch(code)
    {
      case   69: setMultipass(); break                                          // E
      case   73: trackChange();  break                                          // I
      case   77: setMutate();    break                                          // M
      case   85: setLimit();     break                                          // U
      case   49: case 50: case 51:
      case   52: case 53: case 54:
      case   55: case 56: case 57:
        LEN1 = code -   48; changeMatrix(); break                               // 1 - 9
      case 1049: case 1050: case 1051:
      case 1052: case 1053: case 1054:
      case 1055: case 1056: case 1057:
        LEN2 = code - 1048; changeMatrix(); break                               // Shift 1 - 9
    }
  }
  else if (CATYPE == 2)
  {
    switch(code)
    {
      case  86: changeWolfOffset();        break                                // V
      case 219: setWolfRule(WOLFRULE - 1); break                                // [
      case 221: setWolfRule(WOLFRULE + 1); break                                // ]
    }
  }

  switch(code)
  {
    case 100066: togglePatterns();  break                                       // Alt-B
    case 100070: flipSelection();   break                                       // Alt-F
    case 100077: mirrorSelection(); break                                       // Alt-M
    case 100082: rotateSelection(); break                                       // Alt-R
    case  10067: copySelection();   break                                       // Ctrl-C
    case  10086: pasteSelection();  break                                       // Ctrl-V
    case  10088: eraseSelection();  break                                       // Ctrl-X

    case     13:                                                                // Return - Not documented but it's kind of intuitive
    case     27: clearActions(1);         break                                 // Esc    - to use these to dismiss some things
    case     65: newPreset();             break                                 // A
    case     67: clearWorld();            break                                 // C
    case     68: setInfo();               break                                 // D
    case     70: randomFilledRectangle(); break                                 // F
    case     71: setGuide();              break                                 // G
    case     72: setHardborder();         break                                 // H
    case     75: makeCode();              break                                 // K
    case     76: randomLine();            break                                 // L
    case     78: setRules();              break                                 // N
    case     79: randomOpenRectangle();   break                                 // O
    case     80: setStep();               break                                 // P
    case     81: quickGuide();            break                                 // Q
    case     83: STEPFLAG = false;        break                                 // S
    case     84: monoColor();             break                                 // T
    case     87: writeKreechers();        break                                 // W
    case    188: plusRes();               break                                 // <
    case    190: minusRes();              break                                 // >
  }

  function togglePatterns()                                                     // Handles the clipboard display window
  {
    if (cwin.style.display == 'block')
    {
      cwin.style.display = 'none'
    }
    else                            savedPatterns()
  }

  function flipSelection()                                                      // Flips the selection over a horizontal axis
  {
    if (!ALT.f) return

    let x, y, t

    const x1 = ALT.x1 < ALT.x2 ? ALT.x1     : ALT.x2,                           // x1,y1 to top left
          x2 = ALT.x2 > ALT.x1 ? ALT.x2 - 1 : ALT.x1 - 1,
          y1 = ALT.y1 < ALT.y2 ? ALT.y1     : ALT.y2,
          y2 = ALT.y2 > ALT.y1 ? ALT.y2 - 1 : ALT.y1 - 1,
          yh = ceil((y2 - y1) / 2)

    for (x = x1 ; x < x2 ; ++x)
    {
      for (y = 0 ; y < yh ; ++y)                                                // Swap top to bottom
      {
        t                = WORLD[x][y1 + y]
        WORLD[x][y1 + y] = WORLD[x][y2 - y]
        WORLD[x][y2 - y] = t
      }
    }

    cancelAll(e)
  }

  function mirrorSelection()                                                    // Mirrors the selection across a verticle axis
  {
    if (!ALT.f) return

    let x, y, t

    const x1 = ALT.x1 < ALT.x2 ? ALT.x1     : ALT.x2,                           // x1,y1 to top left
          x2 = ALT.x2 > ALT.x1 ? ALT.x2 - 1 : ALT.x1 - 1,
          y1 = ALT.y1 < ALT.y2 ? ALT.y1     : ALT.y2,
          y2 = ALT.y2 > ALT.y1 ? ALT.y2 - 1 : ALT.y1 - 1,
          xh = ceil((x2 - x1) / 2)

    for (y = y1 ; y < y2 ; ++y)
    {
      for (x = 0 ; x < xh ; ++x)                                                // Swap left to right
      {
        t                = WORLD[x1 + x][y]
        WORLD[x1 + x][y] = WORLD[x2 - x][y]
        WORLD[x2 - x][y] = t
      }
    }

    cancelAll(e)
  }

  function rotateSelection()                                                    // Rotates squares or rectangles (with data loss)
  {                                                                             // in the selection
    if (!ALT.f) return

    let x, y

    const x1 = ALT.x1 < ALT.x2 ? ALT.x1 : ALT.x2,                               // x1,y1 to top left
          x2 = ALT.x2 > ALT.x1 ? ALT.x2 : ALT.x1,
          y1 = ALT.y1 < ALT.y2 ? ALT.y1 : ALT.y2,
          y2 = ALT.y2 > ALT.y1 ? ALT.y2 : ALT.y1,
          w  = x2 - x1,
          h  = y2 - y1,
          wh = w / h,
          hw = h / w

    let a = createArray(w, h)                                                   // Temporary array while rotating

    for (x = 0 ; x < w ; ++x)
      for (y = 0 ; y < h ; ++y)
        a[x][y] = WORLD[x1 + floor(wh * y)][y1 + h - 1 - floor(hw * x)]         // Add or remove pixels to strectch or shrink a dimension

    for (x = 0 ; x < w ; ++x)                                                   // Copy back from the temporary array
      for (y = 0 ; y < h ; ++y)
        WORLD[x1 + x][y1 + y] = a[x][y]

    cancelAll(e)
  }

  function copySelection()                                                      // Copies the selection to COPYBUF
  {
    if (!ALT.f) return

    let x, y

    const x1 = ALT.x1 < ALT.x2 ? ALT.x1 : ALT.x2,                               // x1,y1 to top left
          x2 = ALT.x2 > ALT.x1 ? ALT.x2 : ALT.x1,
          y1 = ALT.y1 < ALT.y2 ? ALT.y1 : ALT.y2,
          y2 = ALT.y2 > ALT.y1 ? ALT.y2 : ALT.y1,
          w  = x2 - x1,
          h  = y2 - y1

    COPYBUF = createArray(w, h)

    for (x = 0 ; x < w ; ++x)                                                   // From WORLD to COPYBUF
      for (y = 0 ; y < h ; ++y)
        COPYBUF[x][y] = WORLD[x1 + x][y1 + y]

    cancelAll(e)
    savedPatterns()                                                             // Redraw the clips
  }

  function pasteSelection()                                                     // Pastes the selction to the mouse pointer location
  {
    if (COPYBUF == undefined) return                                            // No selection to paste

    let x, y

    const w = COPYBUF.length,                                                   // Gets the width and height of any 2-dimensional array
          h = COPYBUF[0].length

    if (!w || !h) return                                                        // Nothing to paste, so return

    for (x = 0 ; x < w ; ++x)
      for (y = 0 ; y < h ; ++y)
        if ((MOUSEX + LEFT + x) < BWIDTH && (MOUSEY + TOP + y) < BHEIGHT)       // Dont' go outside bounds
          WORLD[MOUSEX + LEFT + x][MOUSEY + TOP + y] = COPYBUF[x][y]            // From COPYBUF to WORLD
  }

  function eraseSelection()                                                     // Erases the current selection but copies it first
  {
    if (!ALT.f) return                                                          // Alt not being held, so return

    let x, y

    const x1 = ALT.x1 < ALT.x2 ? ALT.x1 : ALT.x2,                               // put x1,y1 at the top left so all values are now positive
          x2 = ALT.x2 > ALT.x1 ? ALT.x2 : ALT.x1,
          y1 = ALT.y1 < ALT.y2 ? ALT.y1 : ALT.y2,
          y2 = ALT.y2 > ALT.y1 ? ALT.y2 : ALT.y1,
          w  = x2 - x1,
          h  = y2 - y1

    copySelection()                                                             // Make a copy before...

    for (x = 0 ; x < w ; ++x)                                                   // Clear section of WORLD
      for (y = 0 ; y < h ; ++y)
        WORLD[x1 + x][y1 + y] = 0

    cancelAll(e)
  }

  function minusRes()                                                           // Decreases resolution
  {
    let r = RSLTN + 1                                                           // Higher is lower resolution

    if (r < 10) setRes(r)
  }

  function plusRes()                                                            // Increases resolution
  {
    let r = RSLTN - 1                                                           // Lower is higher resolution

    if (r > 0) setRes(r)
  }

  function changeMatrix()                                                       // Modify the rules in the Kreechers matrix
  {
    setRules()
    showRules()

    DIDPRESET = false
    SHOWN     = false
  }

  INFO.d = false
})

function quickGuide()                                                           // Displays the key/mouse guide
{
  if (iwin.style.opacity == 0)                                                  // Test whether displayed or not
  {
    iwin.style.opacity = 1                                                      // Fade to visible
    iwin.style.top     = (CANVH - iwin.offsetHeight) / 2 + 'px'                 // Fly back in
  }
  else
  {
    iwin.style.top     = -(iwin.offsetHeight + 20) + 'px'                       // Push it above the browser so it will fly back in later
    iwin.style.opacity = 0                                                      // Fade to invisible
  }
}

function savedPatterns()                                                        // Pop-up clipboard and saved clips window
{
  let c, dc, j, x, y,

      hr = "<hr style='margin:15px 0px' width=100%>",                           // Heading
      s  = "<h2><center><span style='color:#8f8'>Clipboard &amp; Saved Clips" +
           " Browser</span></center></h2><center><p style='color:#fff; font-" +
           "size:12px'><i>Esc to close / Alt-B (or Option-B) to re-open</i></p>"

  if (COPYBUF.length)                                                           // There is something in the clipboard
    s += "<div class='board'>" + drawSelection(COPYBUF, -1) + "<p><span "     +
        "style='color:#8f8'><b>Your Clipboard:</b></span> <button onclick='"  +
        "saveClip()'>Save Clip</button></p></div>"
  else                                                                          // The clipboard is empty so explain how it works
    s += "<div class='board'><h2><center><span style='color:#fff'>There is "  +
         "nothing in the clipboard</span></center></h2><p style='color:#8f8'" +
         ">Make a selection with Alt and the mouse, then press<br>Ctrl-C to " +
         "copy a selection or, if there are any saved<br> clips below, you "  +
         "can copy one of them to the clipboard</p></div>"

  if (SAVED.length)                                                             // There are some clips in local storage
  {
    c = true

    s += "<hr style='margin:15px 0px' width=100%><h2><center><span style="    + // Saved clips heading
         "'color:#8f8'>Your Saved Clips</span></center></h2>"

    for (j = 0 ; j < SAVED.length ; ++j)                                        // show them one by one
      s += drawSelection(SAVED[j], j) + "<p><b><span style='font-size:12px; " +
           "color:#fff'>Clip " + (j + 1) + ":</span></b> <button onclick='"   +
           "toClip(" + j + ")'>Copy to Clipboard</button> <button onclick='"  +
           "deleteSelection(" + j + ")'>Delete</button></p>" + hr
  }
  else c = false

  if (c) s += "<button onclick='saveToKB()'>Store saved clips in 'presets.js" + // Button to save local clips to 'presets.js' file
              "'</button>" + hr

  if (typeof CLIPS !== 'undefined')                                             // There are also clips in the 'presets.js' filr
  {
    dc = JSON.parse(CLIPS.decompress())
    s += "<h2><center><span style='color:#8f8'>Preset Clips</span><br><span " +
         "style='color:#fff; font-size: 12px'>(Uneditable)</span></center></h2>"

    for (j = 0 ; j < dc.length ; ++j)                                           // Show them all
      s += drawSelection(dc[j]) + "</table></div></p>Clip " + (j + 1)         +
           ": <button onclick='toClip(" + j + ")'>Copy to Clipboard</button>" +
           "<button onclick='deleteSelection(" + j + ")'>Delete</button></p>"
  }

  cwin.innerHTML     = s                                                        // Output to the element
  cwin.style.display = 'block'

  function drawSelection(a, f = 0)                                              // Draw a clip
  {
    let c, s, x, y,

        c1a = "<span onclick='notCell("                                         // Probably could have been much faster with canvases

    const c1b = ")' style='color:",                                             // But the mouse handling would be messy
          c1c = "'>█</span>",                                                   // And it's assumed these clips will be small anyway
          c2  = ")' class='empty'>█</span>",
          w   = a.length,
          h   = a[0].length,
          f1  = "<tr><td class='clip'>",
          f2  = "</td><td class='clip'>",
          f3  = "</td></tr>",
          f4  = "<div style='width:" + w * 6 + "px' class='selection'>"       +
                "<table border=0 cellpadding=0 cellspacing=0 bgcolor=#102>"

    if (f = 0)                                                                  // No editing of preset clips
    {
      c1a = "<span '("
      f = ''
    }

    for (y = 0, s = f4 ; y < h ; ++y, s += f3)
      for (x = 0, s += f1 ; x < w ; ++x, s += f2)
        if (c = a[x][y]) s += c1a + f + ',' + x + ',' + y + c1b +               // Include clickables to edit the cells
                             (COLORS[ceil(c) % 256])      + c1c                 // Show colors if any
        else             s += c1a + f + ',' + x + ',' + y + c2

    return s + "</table></div>"
  }
}

function saveToKB()                                                             // Save local storage clips to keyboard buffer
{                                                                               // for pasting into 'presets.js'
  let t = JSON.stringify(SAVED).compress()                                      // Translate SAVED into JSON

  copyText("let CLIPS = '" + t + "'\n")                                         // Copy the JSON to the keyboard buffer
}

function saveToStorage()                                                        // Save the clips to local storage
{
  let t = JSON.stringify(SAVED).compress()                                      // Translate the array to JSON

  localStorage.setItem('SAVED', t)                                              // Save it locally
}

function getFromStorage()                                                       // Get any clips from local storage
{
  let t = localStorage.getItem('SAVED')
  
  if (t) t = t.decompress()                                                     // Fetch any stored data

  if (t) SAVED = JSON.parse(t)                                                  // Parse the JSON data
}

function saveClip()                                                             // Copy the clipboard to saved clips
{
  SAVED.push(copyArray(COPYBUF))                                                // Push COPYBUF into SAVED
  saveToStorage()                                                               // Save the change locally
  savedPatterns()                                                               // Redraw the clips
}

function toClip(j)                                                              // Copy a saved clip to the clipboard
{
  COPYBUF = copyArray(SAVED[j])                                                 // Slice a copy of the clip from SAVED
  savedPatterns()                                                               // Redraw the clips
}

function deleteSelection(j)                                                     // Delete contents of selection
{
  SAVED.splice(j, 1)                                                            // Splice the clip out of SAVED
  saveToStorage()                                                               // Save the change locally
  savedPatterns()                                                               // Redraw the clips
}

function notCell(f, x, y)                                                       // Invert the value in the specified clip
{
  if (f == -1) COPYBUF[x][y] ^= 1
  else        SAVED[f][x][y] ^= 1

  savedPatterns()                                                               // Redraw the clips
}

function clearActions(f = 0)                                                    // Cancels rubber banding, the clips window
{                                                                               // and the Quick Menu (if Esc was pressed)
  ALT.s = false
  ALT.f = false
  ALT.b = false

  cwin.style.display = 'none'

  if (f == 1)                                                                   // Send the guide window away
  {
    iwin.style.top     = -(iwin.offsetHeight + 20) + 'px'
    iwin.style.opacity = 0
  }
}

function setHardborder()                                                        // Toggles world wrap-around
{
  HARDB ^= true
  SHOWN  = false
}

function setMultipass()                                                         // Toggles single/multip-pass mode
{
  MULTIPASS ^= true
  SHOWN      = false
}

function trackChange()                                                          // Switch between tracking and not
{
  let x

  TRACK ^= true                                                                 // Leave traces in WORLD2 if tracking
                                                                                // fast moving particles
  if (!TRACK)
    for (x = 0 ; x < BWIDTH ; ++x)
      WORLD2[x].fill(0)                                                         // empty WORLD2 after using it

  SHOWN = false
}

function setGuide()                                                             // Turn the guide winow on or off
{
  GUIDE ^= true
  SHOWN  = false
}

function setRes(r)                                                              // Directly set the resoloution
{
  if (RSLTN == 1 && r != 1) scaleDown(r)                                        // Is it already 1 and going down? Yes - do it
  else                                                                          // No...
  {
    scaleUp(RSLTN)                                                              // So scale up to highest res first
    RSLTN = 1

    if (r != 1)
    {
      doResize()                                                                // Resize the display
      scaleDown(r)                                                              // And now scale down to the chosen resolution
    }
  }

  RSLTN = r
  SHOWN = false
  FPS   = floor((log(RSLTN / 2) + 1 ) * 50)                                     // Guess at what the FPS will roughly work out at
                                                                                // So there's no big race to catch up on the display
  doResize()                                                                    // Resize the display
  FPSA.fill(FPS)                                                                // Fill FPS artray with estimated new FPS

  function scaleDown(r)                                                         // Scale down to a lower resolution
  {
    let c, d, j, k, l, m

    for (j = 0 ; j < BWIDTH ; ++j)
      for (k = 0 ; k < BHEIGHT ; ++k, WORLD[floor(j / r)][floor(k / r)] = d)    // This means losing some data
        for (l = 0 ; l < r ; ++l)
          for (m = 0 ; m < r ; ++m)
            d = WORLD[j + l][k + m]                                             // Lookup the location's value

    PAGEX /= r                                                                  // Modify mouse x & y copy accordingly
    PAGEY /= r
  }

  function scaleUp(r)                                                           // Scale up to a higher resolution
  {
    let c, j, k, l, m

    for (j = BWIDTH * r - r ; j >= 0 ; j -= r)
      for (k = BHEIGHT * r - r ; k >= 0 ; k -= r)
        for (l = 0, c = WORLD[floor(j / r)][floor(k / r)] ; l < r ; ++l)        // THis means doubling up some data
          for (m = 0 ; m < r ; ++m)
            WORLD[j + l][k + m] = c                                             // Save the value to the corresponding expanded locations

    PAGEX *= r                                                                  // Modify mouse x & y copy accordingly
    PAGEY *= r
  }

  clearActions()
}

function setLimit()                                                             // between limiting to 2x2 section or not
{
  LIMIT ^= true

  if (LIMIT)
  {
    setRules()
    DIDPRESET = false
  }
  else showRules()

  SHOWN = false
}

function setMutate()                                                            // Switch between mutating and not
{
  MUTATE    ^= true
  DIDPRESET  = false

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
  STEP     ^= true
  STEPPING ^= true

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
  DISPLAY ^= true

  if (DISPLAY)
  {
    mwin.style.display = 'block'
    dwin.style.display = 'block'
  }
  else
  {
    mwin.style.display = 'none'
    dwin.style.display = 'none'
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
  if(document.pointerLockElement    === canvas||
     document.mozpointerLockElement === canvas)
  {
    EDITMODE = true
    EDITX    = PAGEX - canvas.offsetLeft                                        // Why 6? Not sure yet...
    EDITY    = PAGEY - 2

    editcursor.style.left = EDITX * RSLTN + 'px'
    editcursor.style.top  = EDITY * RSLTN + 'px'
  }
  else                                                                          // No, they exited edit mode, so restore main cursor
  {
    EDITMODE                 = false
    editcursor.style.display = 'none'
  }

  SHOWN  = false                                                                // ALlow the info display to be updated
  INFO.d = false
}

function cancelAll(e)                                                           // We have dealt with the action
{                                                                               // So don't allow the vent to trigger
  e.stopPropagation()                                                           // Anything or anywhere else
  e.stopImmediatePropagation()
  e.preventDefault()                                                            // Especially not the default action
}

window.addEventListener('keyup', function(e)                                    // A key has been released
{
  if (SHIFT)                                                                    // Was shift previously pressed?
  {
    SHIFT = false                                                               // Yes, reset the Shift setting

    changeRes()
    updateTopLeft()
  }

  CONTROL.s = false
  CONTROL.f = false
  ALT.s     = false
  INFO.d    = false
})

window.addEventListener("resize", doResize)                                     // Listen for if the user resizes the browser

function doResize()                                                             // If so update the canvas dimensions etc accordingly
{
  CANVW   = min(MAXWIDTH,  window.innerWidth  - 32),                            // The width and height of the canvas may have
  CANVH   = min(MAXHEIGHT, window.innerHeight - 12),                            // changed after a resize
  BWIDTH  = ceil(CANVW / RSLTN),
  BHEIGHT = ceil(CANVH / RSLTN),
  MODEX   = BWIDTH  / ZOOMCT,
  MODEY   = BHEIGHT / ZOOMCT,
  iwin.style.left = (CANVW - iwin.offsetWidth)  / 2 + 'px'

  changeRes()
  setupCanvas()
  INFO.d = false
}

function reverse(s)
{
  return s.split("").reverse().join("")
}

function rand(n)                                                                // Returns a random integer between 0 and n
{
  return floor(Math.random() * n)
}

function createArray(length)                                                    // Creates an array of any number of dimensions
{
  let args,

      a = new Array(length || 0),
      i = length

  if (arguments.length > 1)
  {
    args = Array.prototype.slice.call(arguments, 1)

    while(i--) a[length - 1 - i] = createArray.apply(this, args)
  }

  return a
}

function copyArray(a)
{
  return JSON.parse(JSON.stringify(a))
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

	for (i = 0 ; i < 256 ; ++i)
    dictionary[String.fromCharCode(i)] = i

	for (i = 0 ; i < uncompressed.length ; ++i)
  {
		c  = uncompressed.charAt(i)
		wc = w + c

		if (dictionary.hasOwnProperty(wc)) w = wc
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

	for (i = 0 ; i < 256 ; i += 1)
    dictionary[i] = String.fromCharCode(i)

	if(compressed && typeof compressed === 'string')
  {
		for(i = 0;  i < compressed.length ; ++i)
      tmp.push(compressed[i].charCodeAt(0))

		compressed = tmp
		tmp        = null
	}

	w      = String.fromCharCode(compressed[0])
	result = w

	for (i = 1 ; i < compressed.length ; ++i)
  {
		k = compressed[i]

		if (dictionary[k])    entry = dictionary[k]
    else
    {
			if (k === dictSize) entry = w + w.charAt(0)
      else                return null
		}

		result                     += entry
		dictionary[dictSize++] = w +  entry.charAt(0)

		w = entry
	}

	return result
}
