                                                                                // Critrs (c) 2021 Robin Nixon

const VERSION     = "0.99j",                                                    // This version
      DIDCOPY     = "The following code has been copied to the clipboard. "   + // Used if copying to the keyboard buffer succeeded...
                    "Paste it into the 'presets.js' file to save the "        +
                    "current settings as a new preset.\n\n",
      NOTCOPY     = " Could not copy the below to the clipboard, so "         + // ... or failed
                    "manually type it into the 'presets.js' file to save "    +
                    "the current settings as a new preset.\n\n",
      MUTATEDELAY = 15,                                                         // Delay in seconds between mutations
      FPSBUFSIZE  = 100,                                                        // Size of frame counter buffer
      RLE0        = '0123456789abcdefghijklmnopqrstuvwxyz' +
                              'ABCDEFGHIJKLMNOPQRSTUVWXYZ@#;',                  // Used for compressing world data
      RLE1        = ' :£$%^&*()-_+={}[]~<>,.?/|¬'                               // for saving and loading presets
      MAXWIDTH    = 2200,                                                       // Nicely fits an Asus ZenBook 2nd screen :)
      MAXHEIGHT   = 640                                                         // Should also be good for most PCs though...

let DIDPRESET  =                                                                // Flags that start off true
    GUIDE      =
    DISPLAY    = true,
    MUTATE     =                                                                // Flags that start off false
    SHOWN      =
    LIMIT      =
    LCLICK     =
    RCLICK     =
    STEP       =
    SHIFT      =
    EDITMODE   =
    MONO       =
    TRACK      =
    HARDB      =
    VARYLIFE   =
    MULTIPASS  =
    ZOOMED     =
    STEPFLAG   = false,
    MOUSEX     =                                                                // Globals initialized to 0
    MOUSEY     =
    EDITX      =
    EDITY      =
    PAGEX      =
    PAGEY      =
    PRESET     =
    MUTATECT   =
    OFFSETX    =
    OFFSETY    =
    TOP        =
    ROTIMEOUT  =
    LEFT       = 0,
    CRITRTYPE  = 0,
    QRES       = 1,                                                             // 1 = normal, 2 = quarter resolution
    SMALLCOUNT = QRES * 2,                                                      // Frequency of displaying guide window
    BWIDTH     = Math.min(MAXWIDTH,  window.innerWidth  - 32),                  // Allow for scrollbar
    BHEIGHT    = Math.min(MAXHEIGHT, window.innerHeight - 12),                  // Leave room for canvas bottom in res of less than 640
    WORLD      = createArray(MAXWIDTH, MAXHEIGHT),                              // The game world
    WORLD2     = createArray(MAXWIDTH, MAXHEIGHT),                              // A copy of the world for various uses
    MODECT     =
    MODE       = 100,                                                           // Number of zoom levels
    MODEX      = BWIDTH  / MODECT,                                              // The Dimensiopns of the current zoom level
    MODEY      = BHEIGHT / MODECT,
    WIDTH      = BWIDTH,                                                        // Width of current zoom
    HEIGHT     = BHEIGHT,                                                       // Height of current zoom
    SCALEX     = BWIDTH  / WIDTH,                                               // Scale factor for zoom level
    SCALEY     = BHEIGHT / HEIGHT,
    LEN1       =                                                                // Matrix width and height
    LEN2       = 2,
    RULES      = createArray(9, 9, 4),                                          // Matrix of up to 9 x 9
    OLDFPS     =                                                                // Quick restore after pause or edit
    FPS        = 30,                                                            // Frame counter
    FPSA       = Array(FPSBUFSIZE).fill(FPS),                                   // FPS diplay smoothing array
    MUTATED    = new Object(),                                                  // Details about mutations
    MT         = MUTATEDELAY + 1,                                               // Counter for mutation delays
    TIME       = new Date().getTime(),                                          // The time now
    LENX       = Math.floor(LEN1 / 2),                                          // Half the dimensions of the matrix
    LENY       = Math.floor(LEN2 / 2),                                          // Use for selecting the matrixes most central 2x2 section
    LENX1      = LIMIT ? LENX : 0,                                              // Only used if LIMIT is true
    LENY1      = LIMIT ? LENY : 0,
    VLIFERULES = [3, 2, 3],
    SMALLCTR   = SMALLCOUNT,                                                    // Counter for decidinmg when to display the guide
    CONTEXT    = canvas.getContext('2d', { alpha: false }),                     // A context into the canvas
    CANV       = canvas                                                         // A pointer to the canvas
    CANV.rpl   = canvas.requestPointerLock || canvas.mozRequestPointerLock      // For requesting a pointer lock on the cursor

init()                                                                          // Prepare everything

function init()
{
  setupCanvas()                                                                 // Ready the canvas
  clearWorld()                                                                  // Empty WORLD
  setQres()                                                                     // Start in the fastest mode
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
    drawWorld()                                                                 // Draw the result of processing
  }
  else
  {
    drawWorld()                                                                 // We are editing ort stepping so just draw the world
  }                                                                             // Because we may be modifying it

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

  FPS    = Math.floor((k + l) / FPSBUFSIZE)                                     // Calculate the average
  OLDFPS = FPS                                                                  // Keep a copy for restoring after pausing
  TIME   = timenow                                                              // What's the time now?

  setTimeout(mainLoop, 0)                                                       // We're done - go around again

  function editParticles()                                                      // These functions are within mainLoop() as this is
  {                                                                             // the only place they are called - keeps things clear
    WORLD[Math.floor(MOUSEX + LEFT)][Math.floor(MOUSEY + TOP)] = LCLICK ? 1 : 0 // and the scope tidy
                                                                                // This simply sets or restes a location
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
      x = intRand(LEN1)
      y = intRand(LEN2)
      p = LIMIT ? intRand(Math.min(LEN2, 2)) : intRand(LEN2)
      q = LIMIT ? intRand(Math.min(LEN1, 2)) : intRand(LEN1)
      n = intRand(2) * 2

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
    let s = ''

    if (SHOWN)
    {
      return updateControls()                                                   // Already created, only the controls etc need updating
    }

    s += "<table style='border:1px solid #00f; margin:5px; background:#004; " +
         "opacity:70%'><tr><td><table style='border:none' width=320>"

    s += "<tr><th colspan=2 style='height:20px; background:#008; color:#8f8;" +
         "border:1px solid #008; font-size:16px; text-align:center'><b>"      +
         "CRITRS v" + VERSION + " &nbsp; &copy; 2021 by <a href="             +
         "http://robinnixon.com>Robin Nixon</a></b>&nbsp;</span></th></tr>"   +
         "<tr><th colspan=2></th></tr>"

    s += "<tr><td width=50%>Zoom Level</td><td align=right><span id=i0>"      +
         "&nbsp;</span></td></tr>"

    s += "<tr><td>Current Preset</td><td align=right><span id=i1>&nbsp;"      +
         "</span></td></tr>"

    s += "<tr><td>Frame Rate</td><td align=right><span id=i3>&nbsp;</span>"   +
         "</td></tr>"

    if (CRITRTYPE == 1)
    {
      s += "<tr><td>Life Rules: Neighbors =</td><td align=right><span id="    +
           "i4>&nbsp;</span></td></tr>"
    }

    s += "</tr><tr><th colspan=2></th></tr>"

    s += "<tr ><td><u>G</u>uide Window</td><td data-title='Hides &amp; "      +
         "displays the bottom-left window' align=right><label class=switch>"  +
         "<input onclick='setGuide()' type=checkbox "                         +
         (GUIDE ? "checked" : "") + "><span class='slider round'></span>"     +
         "</label></td></tr>"

    s += "<tr><td>High <u>Q</u>uality Res. (<i>slower</i>)</td><td "          +
         "data-title='High resolution gives you four times as much to see"    +
         ", but low resolution is two to three times faster (or more)' align" +
         "=right><label class=switch><input onclick='setQres()' type=chec"    +
         "kbox " + (QRES == 1 ? "checked" : "") + "><span class='slider "     +
         "round'></span></label></td></tr>"

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

    if (CRITRTYPE == 1)
    {
      s += "<tr><td><u>V</u>ary Rules Randomly</td><td data-title='Varying "  +
           "the rules of Life makes for some interesting results such as fan" +
           "tastic mosaics and spectacular crystalline growths' align=right>" +
           "<label class=switch><input onclick='varyLife()' type=checkbox "   +
           (VARYLIFE ? "checked" : "") + "><span class='slider round'>"       +
           "</span></label></td></tr>"
    }

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

      s += "<tr><td>Columns: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "      +
           "&nbsp; &nbsp; <span class=keys><u>1</u>&hellip;<u>9</u></span>"   +
           "</td><td align=right><input oninput='LEN1=parseInt(this.value); " +
           "setRules()' type=range min=1 max=9 value=" + LEN1 + "></td></tr>"

      s += "<tr><td>Rows: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "  +
           "<span class=keys><u>Shift</u><u>1</u>&hellip;<u>9</u></span>"     +
           "</td><td align=right><input oninput='LEN2=parseInt(this.value); " +
           "setRules()' type=range min=1 max=9 value=" + LEN2 + "></td></tr>"

      s += "<tr><th colspan=2></th></tr>"

      s += "<tr><td><span id=i2a>Next Mutation</span><td align=right><span "  +
           "id=i2b>&nbsp;</span></td></tr>"

      s += "<tr><td>Matrix Dimensions</td><td align=right><span id=i4>&nbsp;" +
           "</span></td></tr>"

      s += "<tr><td>Number of Cells</td><td align=right><span id=i5>&nbsp;"   +
           "</span></td></tr>"

      s += "<tr><td>Available Rules per Cell</td><td align=right><span "      +
           "id=i6>&nbsp;</span></td></tr>"

      s += "<tr><td>Possible Combinations</td><td align=right><span id=i7>"   +
           "&nbsp;<sup>&nbsp;</sup></span></td></tr>"

      s += "<tr><th colspan=2></th></tr>"

      s += "<tr><td colspan=2><button onclick='playLife()' style='width:"     +
           "100%'>This is CRITRS - Play The Game of Life</button></td></tr>"
    }
    else if (CRITRTYPE == 1)
    {
      s += "<tr><td colspan=2><button onclick='playCritrs()' style='width:"   +
           "100%'>This is The Game of Life - Play CRITRS</button></td></tr>"
    }

    s += "<tr><td align=middle><button data-title='Draws a random line of "   +
         "particles in the current view' onclick='randomLine()' style='width" +
         ":100%'>Random <u>L</u>ine</button></td>"

    if (CRITRTYPE == 0 || VARYLIFE)
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
      s += "<td align=middle><button data-title='Draws a random open "        +
           "triangle of particles in the current view' onclick='random"       +
           "Triangle()' style='width:100%'><u>R</u>andom Open Triangle"       +
           "</button></td></tr>"
    }

    s += "<tr><td align=middle><button data-title='Draws a random open "      +
         "rectangle of particles in the current view' onclick='randomOpen"    +
         "Rectangle()' style='width:100%'>Random <u>O</u>pen Rect.</button>"  +
         "</td><td align=middle><button data-title='Draws a random filled "   +
         "rectangle of particles in the current view' onclick='randomFilled"  +
         "Rectangle()' style='width:100%'>Random <u>F</u>illed Rect." +
         "</button></td></tr>"

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
  let y, m, n, t,
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

      if (m && (n >= VLIFERULES[1] && n <= VLIFERULES[2]))                      // VLIFERULES can be modified to make variations
      {                                                                         // If not in these bounds a particle 'dies'
        WORLD2[x][y] = m + .1                                    // A small value to cycle colors slower
      }
      else if (!m && (n == VLIFERULES[0]))                                      // The cell is unoccupied and...
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

  const p  = SCALEX * QRES,                                                     // Calculate now, once, and not in the loops
        q  = SCALEY * QRES,
        p1 = FPS < 15 ? Math.ceil(p / 4 + .5) : p / 4 + .5,
        q1 = FPS < 15 ? Math.ceil(q / 4 + .5) : q / 4 + .5,
        a  = FPS < 15 ? Math.floor(p + 1) : p + 1,
        b  = FPS < 15 ? Math.floor(q + 1) : q + 1,
        bh = BHEIGHT *.8,
        bw = BWIDTH  *.8,
        h  = Math.floor(bh - p - 2)         - OFFSETY,
        i  = Math.floor(BWIDTH / 5 + q + 2) - OFFSETX * 1.8,
        wq = BWIDTH  * QRES,
        hq = BHEIGHT * QRES

  CONTEXT.fillStyle = '#102'                                                    // World bacground color

  if (GUIDE)                                                                    // Clear the canvas around the guide
  {
    CONTEXT.fillRect(0, 0, wq, bh * QRES - 3)
    CONTEXT.fillRect(wq / 5 + 3, hq *.8 - 3, bw * QRES, hq / 5 + 3)
  }
  else
  {
    CONTEXT.fillRect(0, 0, wq, hq)                                              // Clear the whole canvas
  }

  while (x < WIDTH)                                                             // Process through current world view, x first
  {
      y  = 0
      lx = LEFT + x
      xp = OFFSETX + Math.floor(x * p)

    while (y < HEIGHT)                                                          // Then y
    {
      if (w = Math.ceil(WORLD[lx][TOP + y]))                                    // Found a particle?
      {
        if (c != w)
        {
          CONTEXT.fillStyle = c = MONO ? COLORS[1] : COLORS[w % 256]            // Change color, but only if different to last time
        }

        if (!(GUIDE && (x * SCALEX) < i && (y * SCALEY) > h))                   // Are the displayed coordinates outside of the guide,
        {
          CONTEXT.fillRect(xp, OFFSETY + Math.floor(y * q), a, b)               // if displayed? - if yes draw the particle
        }
      }
      else if (TRACK && (w = WORLD2[lx][TOP + y]) && ++d == 8)                  // Is tracking on?
      {
        d = 0

        if (c != w)
        {
          CONTEXT.fillStyle = c = '#bdf'                                        // Change color if different
        }

        if (!(GUIDE && (x * SCALEX) < i && (y * SCALEY) > h))                   // Outside guide area, if displayed?
        {
          CONTEXT.fillRect(xp, OFFSETY + Math.floor(y * q), p1, q1)             // Yes so draw dot
        }
      }
      y++
    }
    x++
  }

  if (CRITRTYPE == 0 && !STEP)
  {
    backtoBin()                                                                 // Have the colors restart at 1
  }

  drawSmall()
}

function backtoBin()
{
  let y,
      x = 0

  while (x < BWIDTH)                                                            // Restarting at 1 keeps colors consistent and
  {
    y = 0
    WORLD2[x].fill(0)

    while (y < BHEIGHT)                                                         // less sparkly
    {
      WORLD[x][y] = WORLD[x][y] ? 1 : 0
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
        h   = Math.floor(bh * QRES),
        q   = QRES    / 5,
        q5  = QRES    * 5,
        lq  = LEFT    * q,
        tq  = TOP     * q,
        mx  = PAGEX   * q,
        my  = PAGEY   * q + h,
        bhq = BHEIGHT * q,
        bwq = BWIDTH  * q,
        wx  = (MODE == MODECT) ? WIDTH * q -2 : WIDTH * q
        hy  = HEIGHT  * q - 1,
        wx1 = wx      * 5 / QRES,
        hy1 = hy      * 5 / QRES

  if (!GUIDE && ZOOMED)                                                         // When the guide window is not on, this draws
  {                                                                             // A rectangle to indicare the zoom level
    ZOOMED = false                                                              // and position, but only during zooming and mouse moves
    CONTEXT.beginPath()
    CONTEXT.rect(lq * 5 + 6, tq * 5 + 3, wx * 5, hy * 5)
    CONTEXT.stroke()
  }

  if (GUIDE && --SMALLCTR == 0)                                                 // If selected display the guide window
  {                                                                             // but at a reduce frame rate
    SMALLCTR = SMALLCOUNT

    CONTEXT.fillStyle = EDITMODE ? '#006' : '#204'                              // Fill background of guide window
    CONTEXT.fillRect(1, bh * QRES - 1, bwq, bhq)
    CONTEXT.fillStyle = EDITMODE ? '#205' : '#402'                              // Fill background of selection
    CONTEXT.fillRect(lq + 2, h + tq, wx, hy)

    while (x < BWIDTH)                                                          // Select pixel color
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

          CONTEXT.fillRect(Math.floor(    (x / 5) * QRES),                      // Draw pixels
                           Math.floor(h + (y / 5) * QRES), 1, 1)
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
    CONTEXT.rect(0, bh * QRES - 2, bwq + 2, bhq + 2)                            // Outline guide window
    CONTEXT.stroke()
  }

  if (GUIDE && !EDITMODE)                                                       // Mini mouse pointer
  {
    CONTEXT.fillStyle = '#00f'                                                  // This draws more frequently as it
    CONTEXT.fillRect(mx,     my,      2, 10)                                    // has little impact on speed
    CONTEXT.fillRect(mx + 2, my +  2, 2,  8)
    CONTEXT.fillRect(mx + 4, my +  4, 2,  8)
    CONTEXT.fillStyle = '#aaf'
    CONTEXT.fillRect(mx,     my,      1,  3)
    CONTEXT.fillRect(mx + 1, my + 1,  1,  2)
  }
}

function setupCanvas()                                                          // Sets up the canvas
{
  canvas.width  = BWIDTH  * QRES
  canvas.height = BHEIGHT * QRES
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
  const w1 = Math.floor(WIDTH  /  5),
        w2 = Math.floor(WIDTH  / 10),
        h1 = Math.floor(HEIGHT /  5),
        h2 = Math.floor(HEIGHT / 10)

  rectangle(intRand(WIDTH - w1) + w2, intRand(HEIGHT - h1) + h2,
            intRand(WIDTH - w1) + w2, intRand(HEIGHT - h1) + h2,
              RCLICK ? 0 : 1)
  ifStep(1)
}

function randomTriangle()                                                       // Draws a random rectangle of particles in the world
{
  const w1 = Math.floor(WIDTH  /  5),
        w2 = Math.floor(WIDTH  / 10),
        h1 = Math.floor(HEIGHT /  5),
        h2 = Math.floor(HEIGHT / 10),
        x1 = intRand(WIDTH  - w1) + w2,
        x2 = intRand(WIDTH  - w1) + w2,
        x3 = intRand(WIDTH  - w1) + w2,
        y1 = intRand(HEIGHT - h1) + h2,
        y2 = intRand(HEIGHT - h1) + h2,
        y3 = intRand(HEIGHT - h1) + h2

  line(x1, y1, x2, y2, RCLICK ? 0 : 1)
  line(x2, y2, x3, y3, RCLICK ? 0 : 1)
  line(x3, y3, x1, y1, RCLICK ? 0 : 1)

  ifStep(1)
}

function randomFilledRectangle()                                                // Draws a random filled rectangle of particles in the world
{
  const w1 = Math.floor(WIDTH  /  5),
        w2 = Math.floor(WIDTH  / 10),
        h1 = Math.floor(HEIGHT /  5),
        h2 = Math.floor(HEIGHT / 10)

  filledRectangle(intRand(WIDTH - w1) + w2, intRand(HEIGHT - h1) + h2,
                  intRand(WIDTH - w1) + w2, intRand(HEIGHT - h1) + h2,
                    RCLICK ? 0 : 1)
  ifStep(1)
}

function randomLine()                                                           // Draws a random line of particles in the world
{
  const w1 = Math.floor(WIDTH  /  5),
        w2 = Math.floor(WIDTH  / 10),
        h1 = Math.floor(HEIGHT /  5),
        h2 = Math.floor(HEIGHT / 10)

  line(intRand(WIDTH - w1) + w2, intRand(HEIGHT - h1) + h2,
       intRand(WIDTH - w1) + w2, intRand(HEIGHT - h1) + h2,
         RCLICK ? 0 : 1)

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

    j += Math.sign(x2 - x1)
  }
}

function makeCode()                                                             // Creates a preset suitable for adding to presets.js
{
  const m = 64 ** 2                                                             // #1000

  let j, y, d, e,
      x = 0,
      s = '',
      c = '[' + CRITRTYPE + ','                                                 // Preset header with the type of Critr and, for

  if (CRITRTYPE == 0)
  {
    c += LEN1 + ','  + LEN2 + ',' + Math.sign(LIMIT)  + ','                     // type 0, the width and height of the rule matrix
                                                                                // And whether rules are limited to a 2x2 section
    while (x < LEN1)                                                            // Extracts the rule set into c
    {
      y = 0

      while (y < LEN2)
      {
        j = 0

        while(j < 4)
        {
          c += RULES[x][y][j++] + ','
        }

        y++
      }

      x++
    }
  }

  o  = RLE0.charAt(Math.floor(BWIDTH  / 64)) +                                  // The particle locations are encoded in o
       RLE0.charAt(Math.floor(BWIDTH  % 64))                                    // Store the width & height in base 64
  o += RLE0.charAt(Math.floor(BHEIGHT / 64)) +
       RLE0.charAt(Math.floor(BHEIGHT % 64))
  o += WORLD[0][0] ? '1' : '0'                                                  // Save the first value (1 or 0) to start with

  x = 0
  f = 0
  d = WORLD[0][0]

  while(x < BWIDTH)                                                             // DATA FORMAT...
  {
    y = 0

    while (y < BHEIGHT)
    {                                                                           // RLEO holds the 64 characters for two-byte pairs
      e = WORLD[x][y] ? 1 : 0                                                   // of up to a #FFF (4095) long contiguous line.
                                                                                // The ! character represents a #1000 (4096) run.
      if (d == e)                                                               // Longer runs require additional ! characters
      {                                                                         // and/or a one byte character or two-byte pair to end.
        if (++f == m)                                                           // Shorter runs of 1-25 characters are represented
        {                                                                       // by a single character in RLE1 as these are common.
          o += '!'                                                              // A fairly complex configuration of about 250K
          f  = 0                                                                // particles will compress to under 100K of text.
        }                                                                       // Many start-up, hand-crafted initial configurations
      }                                                                         // are well under 5K.
      else                                                                      // If only the current rule set is to be stored,
      {                                                                         // When this is copied to the keyboard buffer,
        if (f < 26)
        {
           o += RLE1.charAt(f)                                                  // The data string can be manually replaced with ''.
        }
        else
        {
          o += RLE0.charAt(Math.floor(f / 64))
            +  RLE0.charAt(           f % 64)
        }

        d = e
        f = 1
      }
      y++
    }
    x++
  }

  copyText(c + "'" + o + "'" + '],\n')                                          // Copies the preset to the keyboard buffer
}

function decodeWorld(s)                                                         // Unpacks the above and applies it
{
  const m = 64 ** 2

  let h, w, y, p, t, u,
      v = '',
      j = 0,
      x = 0

  w = parseInt(RLE0.indexOf(s.charAt(j++))) * 64 +
      parseInt(RLE0.indexOf(s.charAt(j++)))
  h = parseInt(RLE0.indexOf(s.charAt(j++))) * 64 +
      parseInt(RLE0.indexOf(s.charAt(j++)))
  p = s.charAt(j++)

  if (h >  320        && QRES == 2 ||
      h <= BWIDTH / 2 && QRES == 1)
  {
    setQres()
  }

  while (j < s.length)
  {
    t = s.charAt(j++)

    if (t == '!')
    {
      v += p.repeat(m)
    }
    else
    {
      u = parseInt(RLE1.indexOf(t))

      if (u > -1)
      {
        v += p.repeat(u)
      }
      else
      {
        v += p.repeat(parseInt(RLE0.indexOf(t)) * 64 +
                      parseInt(RLE0.indexOf(s.charAt(j++))))
      }

      p = (p == '1') ? '0' : '1'
    }
  }

  clearWorld()

  j = 0

  while (x < w)
  {
    y = 0

    while (y < h)
    {
      if (x < MAXWIDTH && y < MAXHEIGHT)
      {
        WORLD[x][y] = v.charAt(j++) == '1' ? 1 : 0
      }
      else
      {
        j++
      }
      y++
    }
    x++
  }
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
    ta.style.top      =
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
  SHOWN                =
  VARYLIFE             = false
  matrix.style.display = 'block'
}

function playLife()                                                             // Switch to playing Life
{
  CRITRTYPE            = 1
  SHOWN                = false
  matrix.style.display = 'none'
}

function varyLife()
{
  VARYLIFE = !VARYLIFE

  if (!VARYLIFE)
  {
    VLIFERULES = [3, 2, 3]
  }
  else
  {
    setRules()
  }

  SHOWN = false
}

function updateControls()                                                       // Just update the info section each frame
{
  const n  = LEN1 * LEN2,
        mt = Math.floor(15.9 - MUTATECT / FPS),
        p  = PRESET == 0 ? PRESETS.length : PRESET,
        q  = (PRESET == PRESETS.length - 1) ?
                        PRESETS.length : (PRESET + 1) % PRESETS.length,
        r  = LIMIT ? 7 : n * (n - 1) / 2 + 1

  let a = 0,
      b = ''
      t = r ** n

  if (mt < MT) MT = mt

  t = t.toExponential(2).toString()
  t = t.substr(0, 4) + " &times; 10<sup>" + t.substr(6) + "</sup>"

  while (a < 9)
  {
    if (a < VLIFERULES[1] || a > VLIFERULES[2])
    {
      b += a.toString()
    }
    a++
  }

  i0.innerHTML = Math.ceil((MODE / MODECT * 100)) + "% (" +
                 WIDTH + " &times; " + HEIGHT + ")"
  i1.innerHTML = DIDPRESET? p + " of " + PRESETS.length :
                 "None (Next is " + q + " of " + PRESETS.length + ")"
  i3.innerHTML = ((STEP || EDITMODE) ? 0 : FPS) + " FPS"
  i4.innerHTML = 'B = ' + VLIFERULES[0] + ' &nbsp; D = ' + b

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

  if (VARYLIFE)
  {
    return
  }

  const l1 = Math.floor(LEN1 / 2),
        l2 = Math.floor(LEN2 / 2)

  for (y = 0, s = "<table id=matrix style='border:1px " +
    "solid #00f;background:#004;opacity:70%'>" ; y < LEN2 ; ++y, s += '</tr>')
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
  let a, b, c, y, z,
      x = 0

  if (VARYLIFE)
  {
    VLIFERULES[0] = intRand(            3) + 1
    VLIFERULES[1] = intRand(VLIFERULES[0]) + 2
    VLIFERULES[2] = intRand(VLIFERULES[1]) + VLIFERULES[1]

    return
  }

  LENX  = Math.floor(LEN1 / 2)                                                  // Half the dimensions of the matrix
  LENY  = Math.floor(LEN2 / 2)                                                  // Use for selecting the matrixes most central 2x2 section
  LENX1 = LIMIT ? LENX : 0                                                      // Only applied if LIMIT is true
  LENY1 = LIMIT ? LENY : 0

  while (x < LEN1)
  {
    y = 0

    while (y < LEN2)
    {
      z = 0

      while (z < 2)
      {
        setRule(x, y, (LIMIT ? intRand(Math.min(LEN2, 2)) : intRand(LEN2)),
                      (LIMIT ? intRand(Math.min(LEN1, 2)) : intRand(LEN1)),
                        z++ * 2, 0)
      }
      y++
    }
    x++
  }

  MUTATED.f =
  STEPFLAG  =
  DIDPRESET = false

  showRules()
}

function writeCritrs()                                                          // Draw app name
{
  const t = Math.floor(HEIGHT / 5),                                             // Top line
        m = Math.floor(HEIGHT / 2),                                             // Middle line
        a = Math.floor((m - t) / 2),                                            // Quarter character height
        b = t * 4,                                                              // Bottom line
        d = Math.floor((WIDTH / 1.5) / 5),                                      // Character spacing
        w = Math.floor(d / 2),                                                  // Character width
        h = Math.floor(t + a),                                                  // Halfway between top and middle
        j = Math.floor(m + a),                                                  // Halfway between middle and bottom
        C = Math.floor(WIDTH / 7),                                              // Horizontal placement of C
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
  let s, y, z,
      n = 0,
      x = 0

  CRITRTYPE = PRESETS[PRESET][n++]                                              // Fetch the CRITRT type, then if...

  if (CRITRTYPE == 0)                                                           // ... type0, width, height and whether limited to 2x2
  {
    LEN1  = PRESETS[PRESET][n++]
    LEN2  = PRESETS[PRESET][n++]
    LIMIT = PRESETS[PRESET][n++] == 1 ? true : false

    while (x < LEN1)
    {
      y = 0

      while (y < LEN2)
      {
        z = 0

        while(z < 4)
        {
          RULES[x][y][z++] = PRESETS[PRESET][n++]                               // Store the rules
        }
        y++
      }
      x++
    }

    s = PRESETS[PRESET][n]

    clearWorld()

    if (s != '')
    {
      decodeWorld(s)
      drawWorld()
    }
    else
    {
      writeCritrs()
    }

    MUTATECT  = 0                                                               // Reset mutation (if enabled)
    DIDPRESET = true
    MT        = 16
    SHOWN     = false
    MUTATED.f = false
  }
  else if (CRITRTYPE == 1)
  {
    s = PRESETS[PRESET][n]

    if (s != '')
    {
      decodeWorld(s)
      drawWorld()
    }
    else
    {
      writeCritrs()
    }
  }

  if (++PRESET >= PRESETS.length)
  {
    PRESET = 0                                                                  // Move pointer to next preset ready for subsequent call
  }

  if (CRITRTYPE == 0)
  {
    showRules()                                                                 // Display the new rules
  }
}

function changeMode()                                                           // Modify global variables relating to display
{
  WIDTH  = Math.floor(MODE * MODEX)                                             // Determine window width and height
  HEIGHT = Math.floor(MODE * MODEY)
  SCALEX = BWIDTH  / WIDTH                                                      // Work out the scaling factor to enlarge by
  SCALEY = BHEIGHT / HEIGHT

  updateTopLeft()
}

function updateTopLeft()                                                        // Calculate TOP and LEFT of window
{
  const dl = BWIDTH  - WIDTH,
        dt = BHEIGHT - HEIGHT,
        sx = Math.floor((PAGEX - canvas.offsetLeft) * (dl / BWIDTH)),
        sy = Math.floor((PAGEY - canvas.offsetTop)  * (dt / BHEIGHT))

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

canvas.addEventListener( 'wheel', doModeChange)                                 // Wheel or touchpad scroll
output1.addEventListener('wheel', doModeChange)
output2.addEventListener('wheel', doModeChange)

function doModeChange(e)                                                        // The mouse wheel has been moved so zoom
{
  const y = e.wheelDelta  ? e.wheelDelta : -e.deltaY,                           // Direction of zoom
        t = e.wheelDeltaY ? e.wheelDeltaY == -3 * e.deltaY : e.deltaMode == 0,  // Touchpad or mouse?
        m = t ? 1.5 : 16 / QRES                                                 // Amount to zoom by (less for Touchpad or Quarter Res)

  clearTimeout(ROTIMEOUT)                                                       // Still zooming, cancel the call to remove the offsets

  e.stopPropagation()                                                           // Don't pass event to system
  e.stopImmediatePropagation()
  e.preventDefault()

  if (!EDITMODE && SHIFT )                                                      // As long as we aren't editing
  {
    PAGEX = e.pageX / QRES                                                      // We need copies of these here...
    PAGEY = e.pageY / QRES                                                      // ...as well as from onMousemove
  }

  if (Math.sign(y) == 1)                                                        // Scroll forwards
  {
    MODE -= MODE / MODECT * m                                                   // Zoom in, more slowly as we go

    if (MODE < 1)
    {
      MODE = 1                                                                  // Stay in bounds
    }
  }
  else                                                                          // Scroll backwards
  {
    MODE += MODE / MODECT * m                                                   // Zoom out, faster as we go

    if (MODE > MODECT)
    {
      MODE = MODECT                                                             // Stay in bounds
    }
  }

  changeMode()                                                                  // Update the canvas variables etc

  OFFSETX = ((e.pageX / QRES - canvas.offsetLeft) % SCALEX) * QRES              // Centers current pixel during
  OFFSETY = ((e.pageY / QRES                    ) % SCALEY) * QRES              // zoom to prevent jitter}

  if (GUIDE)
  {
    drawSmall()                                                                 // Draw small window
  }

  ZOOMED    = true
  ROTIMEOUT = setTimeout(removeOffset, 150)                                     // Remove the offests in 150 milliseconds

  function removeOffset()                                                       // After zooming the offsets aren't wanted
  {
    OFFSETX =
    OFFSETY = 0
  }
}

document.body.addEventListener('mousemove', doMousemove)                        // The mouse has been moved so update position

function doMousemove(e)
{
  if (!EDITMODE && e.pageX < (BWIDTH * QRES) &&                                 // Only accept values within the canvas
      e.pageY < (BHEIGHT * QRES))
  {
    PAGEX = e.pageX / QRES
    PAGEY = e.pageY / QRES
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

    MOUSEX                = Math.floor(EDITX / SCALEX )                         // Set the mouse x & y
    MOUSEY                = Math.floor(EDITY / SCALEY )
    editcursor.style.left = EDITX * QRES + 'px'                                 // And edit cursor x & y
    editcursor.style.top  = EDITY * QRES + 'px'
  }
  else
  {
    MOUSEX = Math.floor(e.offsetX / QRES / SCALEX)                              // Locate the mouse
    MOUSEY = Math.floor(e.offsetY / QRES / SCALEY)
  }

  ZOOMED = true
  updateTopLeft()                                                               // AFter zooming the top left will have changed
}

canvas.addEventListener('mouseup', e =>                                         // The mouse button is up
{
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

  if (EDITMODE)
  {
    return                                                                      // These keys are ignored during editing
  }

  if (CRITRTYPE == 0 || VARYLIFE)
  {
    switch(SHIFT ? code + 1000 : code)                                          // Add 1000 if Shift is pressed
    {
      case   72: setHardborder();                  break                        // H
      case   73: trackChange();                    break                        // I
      case   77: setMutate();                      break                        // M
      case   78: setRules();                       break                        // N
      case   85: setLimit();                       break                        // U
      case   49: case 50: case 51:
      case   52: case 53: case 54:
      case   55: case 56: case 57:
                 LEN1 = code - 48; changeMatrix(); break                        // 1 - 9
      case 1049: case 1050: case 1051:
      case 1052: case 1053: case 1054:
      case 1055: case 1056: case 1057:
                 LEN2 = code - 48; changeMatrix(); break                        // Shift 1 - 9
    }
  }

  switch(SHIFT ? code + 1000 : code)                                            // Add 1000 if Shift is pressed
  {
    case   65: newPreset();                        break                        // A
    case   67: clearWorld();                       break                        // C
    case   68: setInfo();                          break                        // D
    case   69: setMultipass();                     break                        // E
    case   70: randomFilledRectangle();            break                        // F
    case   71: setGuide();                         break                        // G
    case   75: makeCode();                         break                        // K
    case   76: randomLine();                       break                        // L
    case   79: randomOpenRectangle();              break                        // O
    case   80: setStep();                          break                        // P
    case   81: setQres();                          break                        // Q
    case   82: randomTriangle();                   break                        // R
    case   83: STEPFLAG = false; backtoBin();      break                        // S
    case   84: monoColor();                        break                        // T
    case   86: varyLife();                         break                        // V
    case   87: writeCritrs();                      break                        // W
  }

  function changeMatrix()                                                       // Modify the rules in the matrix
  {
    setRules()
    showRules()

    DIDPRESET =
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

function setQres()                                                              // Switch between full and quarter resolution
{
  let c, d, k, l, m,
      j = 0

  QRES = (QRES == 1) ? 2 : 1

  if (QRES == 2)                                                                // If quarter resolution copy down the world
  {
    while (j < BWIDTH)
    {
      k = 0

      while (k < BHEIGHT)
      {
        l = 0
        d = 0

        while (l < 2)
        {
          m = 0

          while (m < 2)
          {
            d += WORLD[j + l][k + m++]
          }

          l++
        }

        WORLD[j / 2][k / 2] = Math.sign(d)
        k += 2
      }
      j += 2
    }

    PAGEX /= 2                                                                  // Modify mouse x & y copy accordingly
    PAGEY /= 2
    FPS   *= 2
  }
  else                                                                          // If full resolution copy up the world
  {
    j = BWIDTH * 2 - 2

    while (j >= 0)
    {
      k = BHEIGHT * 2 - 2

      while (k >= 0)
      {
        l = 0
        c = WORLD[j / 2][k / 2]

        while (l < 2)
        {
          m = 0

          while (m < 2)
          {
            WORLD[j + l][k + m++] = c
          }
          l++
        }
        k -= 2
      }
      j -= 2
    }

    PAGEX *= 2                                                                  // Modify mouse x & y copy accordingly
    PAGEY *= 2
    FPS   /= 2
  }

  FPSA.fill(FPS)                                                                // Fill FPS artray with estimated new FPS
  doResize()                                                                    // Resize the display

  SHOWN = false                                                                 // ALow info window to update
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
  DIDPRESET=  false

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
    STEPFLAG   = false
    SMALLCOUNT = QRES * 2
    MUTATECT   = 0
    MT         = MUTATEDELAY + 1
  }
  else
  {
    SMALLCOUNT = 1
  }

  SHOWN = false
}

function setInfo()                                                              // Allow the info display or not
{
  DISPLAY = !DISPLAY

  if (DISPLAY)
  {
    output1.style.display =
    output2.style.display = 'block'
  }
  else
  {
    output1.style.display =
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
    EDITMODE                 = true
    EDITX                    = PAGEX - container.offsetLeft
    EDITY                    = PAGEY - container.offsetTop - canvas.offsetTop
    editcursor.style.left    = EDITX + 'px'
    editcursor.style.top     = EDITY + 'px'
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

    changeMode()
    updateTopLeft()
    drawWorld()
  }
})

window.addEventListener("resize", doResize)                                     // Listen for if the user resizes the browser

function doResize()                                                             // If so update the canvas dimensions etc accordingly
{
  BWIDTH  = Math.floor(Math.min(MAXWIDTH,  window.innerWidth  - 32) / QRES),
  BHEIGHT = Math.floor(Math.min(MAXHEIGHT, window.innerHeight - 12) / QRES),
  MODEX   = BWIDTH  / MODECT,
  MODEY   = BHEIGHT / MODECT,

  changeMode()
  setupCanvas()
}

function intRand(n)                                                             // Returns a random integer between 0 and n
{
  return Math.floor(Math.random() * n)
}

function createArray(length)                                                    // Creates an array of any number of dimensions
{
  let a = new Array(length || 0),
      i = length,
      args

  if (arguments.length > 1)
  {
    args = Array.prototype.slice.call(arguments, 1)
    while(i--) a[length-1 - i] = createArray.apply(this, args)
  }

  return a
}
