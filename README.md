# fadeup.js
fadeup.js work for javascript animation. 

## DEMO
[fadeup.js demo](https://decent-works.net/fadeupjs/demo/demo.html)

## Usage
download fadeup.js files and import setting to HTML head element.
jQuery is set up the same way.
```
<link rel='stylesheet' href='fadeUp.css'>
<script src='jquery-xxx.min.js'></script>
<script src='fadeUp.js'></script>
```

### Mark HTML elements for animation
Set the class name "fu" to the HTML element to be animated.
```
<p class="fu">Animation Element</p>
```

### Set Animation Contents
Specify the content of the animation with class name.
| animation | class name |
----|---- 
| move | fuTsl |
| scale | fuScl |
| skew | fuSkw |
| rotate | fuRot |

The animation state is also set by a class name.
| animation state | class name |
----|---- 
| animation time(duration) | fuTime |
| delay time before animation starts | fuDelay |
| Set animation time function | fuTimeFunc |


### ■movement(fuTsl)
The set value of the move is written the below described.
```
fuTsl_startXpos_startYpos_startUnit_endXpos_endYpos_endUnit
```

#### Example
```
<p class="fu fuTsl_0_50_px_0_0_px">Animation Element</p>
```
The end position can be omitted.
If no end position is specified, it moves to the original element position.
```
<p class="fu fuTsl_0_50_px">Animation Element</p>
```

#### setting up animation for tablets
To set up an animation for a tablet, replace "fuTsl" with "fuTabTsl".
```
<p class="fu fuTsl_0_50_px_0_0_px fuTabTsl_0_50_px_0_0_px">Animation Element</p>
```
You must have a PC setup for this configuration.

#### setting up animation for mobile
To set up an animation for a mobile, replace "fuTsl" with "fuMobTsl".
```
<p class="fu fuTsl_0_50_px_0_0_px fuMobTsl_0_50_px_0_0_px">Animation Element</p>
```
You must have a PC setup for this configuration.


### ■scale(fuScl)
The set value of the scale is written the below described.
```
fuScl_startXscale_startYscale_startZscale_endXscale_endYscale_endZscale
```

#### Example
```
<p class="fu fuScl_0.5_0.5_0.5_1.5_1.5_1.5">Animation Element</p>
```
The end scale can be omitted.
If no end scale is specified, it scale to the original element position.
```
<p class="fu fuScl_0.5_0.5_0.5">Animation Element</p>
```

#### setting up animation for tablets
To set up an animation for a tablet, replace "fuScl" with "fuTabScl".
```
<p class="fu fuScl_0.5_0.5_0.5_1.5_1.5_1.5 fuTabScl_0.8_0.8_0.8_1.0_1.0_1.0">Animation Element</p>
```
You must have a PC setup for this configuration.

#### setting up animation for mobile
To set up an animation for a mobile, replace "fuScl" with "fuMobScl".
```
<p class="fu fuScl_0.5_0.5_0.5_1.5_1.5_1.5 fuMobScl_0.8_0.8_0.8_1.0_1.0_1.0">Animation Element</p>
```
You must have a PC setup for this configuration.


### ■skew(fuSkw)
The set value of the skew is written the below described.
```
fuSkw_startXdeg_startYdeg_endXdeg_endYdeg
```

#### Example
```
<p class="fu fuSkw_45_45_20_20">Animation Element</p>
```
The end skew can be omitted.
If no end skew is specified, it skew to the original element position.
```
<p class="fu fuSkw_45_45">Animation Element</p>
```

#### setting up animation for tablets
To set up an animation for a tablet, replace "fuSkw" with "fuTabSkw".
```
<p class="fu fuSkw_45_45 fuTabSkw_30_30">Animation Element</p>
```
You must have a PC setup for this configuration.

#### setting up animation for mobile
To set up an animation for a mobile, replace "fuSkw" with "fuMobSkw".
```
<p class="fu fuSkw_45_45 fuMobSkw_30_30">Animation Element</p>
```
You must have a PC setup for this configuration.


### ■Rotate(fuRot)
The set value of the rotate is written the below described.
```
fuRot_startXdeg_startYdeg_startZdeg_endXdeg_endYdeg_endZdeg
```

#### Example
```
<p class="fu fuRot_0_0_45_20_20_0">Animation Element</p>
```
The end rotate can be omitted.
If no end rotate is specified, it rotate to the original element position.
```
<p class="fu fuRot_0_0_45">Animation Element</p>
```

#### setting up animation for tablets
To set up an animation for a tablet, replace "fuRot" with "fuTabRot".
```
<p class="fu fuRot_0_0_45 fuTabRot_0_0_45">Animation Element</p>
```
You must have a PC setup for this configuration.

#### setting up animation for mobile
To set up an animation for a mobile, replace "fuRot" with "fuMobRot".
```
<p class="fu fuRot_0_0_45 fuMobRot_0_0_45">Animation Element</p>
```
You must have a PC setup for this configuration.

### ■how to change breakpoint
Change the settings in fadeUp.js.
```
const TAB_BREAKPOINT = 1024;
```
TAB_BREAKPOINT is the tablet animation toggle setting. 
If the value is less than or equal to this value, the animation will be displayed for tablet.
```
const MOB_BREAKPOINT = 767;
```
MOB_BREAKPOINT is the mobile animation toggle setting. 
If the value is less than or equal to this value, the animation will be displayed for mobile.

### ■Disable animation for tablet size or smaller
To disable animation below the tablet size, add "fuNoTab" to the class name.
```
<p class="fu fuSkw_45_45 fuNoTab">Animation Element</p>
```

### ■Disable animation for mobile size or smaller
To disable animation below the mobile size, add "fuNoMob" to the class name.
```
<p class="fu fuSkw_45_45 fuNoMob">Animation Element</p>
```

### ■Set "delay" for animation start time
To delay the start of the animation, set "fuDelay_(delayTime milli seconds)" in the class name.
```
<div class="fu fuTsl_0_-100_px fuDelay_3000">Animation Element</p>
```

### ■How to set up multiple consecutive animations
1.Set the class name "fuAninms" to the HTML element to be animated.

2.Set "fuAninms fuName_animationName" on the element you want to animate.
For example, if the animation name is "heroAnim" the below described.
```
<div class="fuAninms fuName_heroAnim">Animation Element</div>
```
3.Create an "animation group" in Javascript and set the animation settings.
```
let animGroups = [];

const animGroup = {
    'name' : 'animation group name',
    'loop' : boolean（true:loop on,  false:loop off) ※At least three animation data are required to turn on looping.
    'loopStart': int animation number, (※1 is the lowest value)
    'animations' : array
}
```

4.The "animations" in "animation group" should be set the below described.
```
    'animations' :  [
        {
            animData: string（initial position）        },
        //animation number 1
        {   animData: string
            animDuration: int         
        },
        //animation number 2
        {
            animData: string
            animDuration: int
        },

                        ・
                        ・
                        ・

    ]

```

Set "string" in "animData" the below described. 

| animation | class name |
----|---- 
| move | fuTsl |
| scale | fuSkw |
| skew | fuScl |
| rotate | fuRot |

In the case of "continuous animation," the "set value" is the "animation end position" because the "end position of the previous animation" is the "start position of the next animation.

## If you want to execute "Continuous Animation" immediately after the web page has finished loading.

Add "fuNoWait" to "Class Name".
```
<div class="fuNoWait fuAninms fuName_heroAnim">animation element</div>
```















