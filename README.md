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
<p class="fuTsl_0_50_px fuDisp">Animation Element</p>
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
<p class="fuTsl_0_50_px_0_0_px">Animation Element</p>
```



