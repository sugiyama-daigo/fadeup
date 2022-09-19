# fadeup.js
fadeup.js work for javascript animation. 

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
| scale | fuSkw |
| skew | fuScl |
| rotate | fuRot |

The animation state is also set by a class name.
| animation state | class name |
----|---- 
| animation time(duration) | fuTime |
| delay time before animation starts | fuDelay |
| Set animation time function | fuTimeFunc |

#### movement(fuTsl)
The set value of the move is written the below described.
```
fuTsl_startXpos_startYpos_startUnit_endXpos_endYpos_endUnit
```
##### Example
```
<p class="fu fuTsl_0_50_px_0_0_px">Animation Element</p>
```
The end position can be omitted.
If no end position is specified, it moves to the original element position.
```
<p class="fu fuTsl_0_50_px">Animation Element</p>
```

##### setting up animation for tablets
To set up an animation for a tablet, replace "fuTsl" with "fuTabTsl".
```
<p class="fu fuTsl_0_50_px_0_0_px fuTabTsl_0_50_px_0_0_px">Animation Element</p>
```
You must have a PC setup for this configuration.

##### setting up animation for mobile
To set up an animation for a mobile, replace "fuTsl" with "fuMobTsl".
```
<p class="fuMobTsl_0_50_px_0_0_px">Animation Element</p>
```
You must have a PC setup for this configuration.





