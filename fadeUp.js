const MOB_BREAKPOINT = 767;
const TAB_BREAKPOINT = 1024;

const ANIMS_NAME_REGEXP = /^.*(fuName\_).*$/g;
const TRANSLATE_REGEXP = /^.*(fuTsl\_).*$/g;
const TRANSLATE_TABLET_REGEXP = /^.*(fuTabTsl\_).*$/g;
const TRANSLATE_MOBILE_REGEXP = /^.*(fuMobTsl\_).*$/g;
const SCALE_REGEXP = /^.*(fuScl\_).*$/g;
const SCALE_TABLET_REGEXP = /^.*(fuTabScl\_).*$/g;
const SCALE_MOBILE_REGEXP = /^.*(fuMobScl\_).*$/g;
const SKEW_REGEXP = /^.*(fuSkw\_).*$/g;
const SKEW_TABLET_REGEXP = /^.*(fuTabSkw\_).*$/g;
const SKEW_MOBILE_REGEXP = /^.*(fuMobSkw\_).*$/g;
const ROTATE_REGEXP = /^.*(fuRot\_).*$/g;
const ROTATE_TABLET_REGEXP = /^.*(fuTabRot\_).*$/g;
const ROTATE_MOBILE_REGEXP = /^.*(fuMobRot\_).*$/g;
const TIME_REGEXP = /^.*(fuTime\_).*$/g;
const DELAY_REGEXP = /^.*(fuDelay\_).*$/g;
const TIME_FUNC_REGEXP = /^.*(fuTimeFunc\_).*$/g;

const ANIMS_NAME_CHECK_REGEXP = /^fuName\_[a-zA-Z0-9]+$/;
const TRANSLATE_CHECK_REGEXP = /^fuTsl(\_[-0-9]{1,10}){2}\_(px|%)((\_[-0-9]{1,10}){2}\_(px|%))?$/;
const TRANSLATE_TABLET_CHECK_REGEXP = /^fuTabTsl(\_[-0-9]{1,10}){2}\_(px|%)((\_[-0-9]{1,10}){2}\_(px|%))?$/;
const TRANSLATE_MOBILE_CHECK_REGEXP = /^fuMobTsl(\_[-0-9]{1,10}){2}\_(px|%)((\_[-0-9]{1,10}){2}\_(px|%))?$/;
const SCALE_CHECK_REGEXP = /^fuScl(\_[-0-9](.?[0-9]+)?){3}((\_[-0-9](.?[0-9]+)?){3})?$/;
const SCALE_TABLET_CHECK_REGEXP = /^fuTabScl(\_[-0-9](.?[0-9]+)?){3}((\_[-0-9](.?[0-9]+)?){3})?$/;
const SCALE_MOBILE_CHECK_REGEXP = /^fuMobScl(\_[-0-9](.?[0-9]+)?){3}((\_[-0-9](.?[0-9]+)?){3})?$/;
const SKEW_CHECK_REGEXP = /^fuSkw(\_[-0-9]{1,3}){2}((\_[-0-9]{1,3}){2})?$/;
const SKEW_TABLET_CHECK_REGEXP = /^fuTabSkw(\_[-0-9]{1,3}){2}((\_[-0-9]{1,3}){2})?$/;
const SKEW_MOBILE_CHECK_REGEXP = /^fuMobSkw(\_[-0-9]{1,3}){2}((\_[-0-9]{1,3}){2})?$/;
const ROTATE_CHECK_REGEXP = /^fuRot(\_[-0-9]{1,3}){3}((\_[-0-9]{1,3}){3})?$/;
const ROTATE_TABLET_CHECK_REGEXP = /^fuTabRot(\_[-0-9]{1,3}){3}((\_[-0-9]{1,3}){3})?$/;
const ROTATE_MOBILE_CHECK_REGEXP = /^fuMobRot(\_[-0-9]{1,3}){3}((\_[-0-9]{1,3}){3})?$/;

const TABLET_CHECK_REGEXP = /^.*(fuNoTab).*$/g;
const MOBILE_CHECK_REGEXP = /^.*(fuNoMob).*$/g;
const NOWAIT_CHECK_REGEXP = /^.*(fuNoWait).*$/g;

/**
 * initialize animation element
 */
const initFadeUp = () => {
    fadeUpElms = $('.fu');
    fadeUpAnimsElms = $('.fuAninms');

    let classNames = '';
    let tabletFlg = false;
    let mobileFlg = false;
    let elm = null;

    //continuous animations
    let animName = null;
    let anims = null;
    let animData = null;
    let result = null;
    let noWait = null;

    //set init state(one animation)
    for (let i = 0; i < fadeUpElms.length; i++) {
        elm = fadeUpElms[i];
        if (($(window).height() + $(window).scrollTop()) < $(elm).offset().top) {
            classNames = $(elm).attr("class").split(' ');
            mobileFlg = false;
            tabletFlg = false;

            if (isTablet()) {
                if ($(elm).attr("class").match(TABLET_CHECK_REGEXP) !== null) {
                    fadeUpElms.splice(i, 1);
                    tabletFlg = true;
                    i--;
                }
            } else if (isMobile()) {
                if ($(elm).attr("class").match(MOBILE_CHECK_REGEXP) !== null) {
                    fadeUpElms.splice(i, 1);
                    mobileFlg = true;
                    i--;
                }
            }

            if (!tabletFlg && !mobileFlg) {
                animData = generateTransformCSS($(elm).attr("class"));
                $(elm).css('transform', animData.join(' '));

                // set hide class
                if (($(window).height() + $(window).scrollTop()) < $(elm).offset().top) {
                    $(elm).addClass('fuHide');
                }
            }
            if (fadeUpElms.length === 0) { break; }
        }
    };
    // //set init state(continuous animations)
    for (let i = 0; i < fadeUpAnimsElms.length; i++) {
        elm = fadeUpAnimsElms[i];
        noWait = isNoWait($(elm).attr("class"));
        classNames = $(elm).attr("class").split(' ');
        tabletFlg = false;
        mobileFlg = false;
        if (isTablet()) {
            if ($(elm).attr("class").match(TABLET_CHECK_REGEXP) !== null || noWait) {
                fadeUpAnimsElms.splice(i, 1);
                tabletFlg = true;
                i--;
                if (noWait) {
                    startFadeUpContinuousAnimation(elm);
                }
            }
        } else if (isMobile()) {
            if ($(elm).attr("class").match(MOBILE_CHECK_REGEXP) !== null || noWait) {
                fadeUpAnimsElms.splice(i, 1);
                mobileFlg = true;
                i--;
                if (noWait) {
                    startFadeUpContinuousAnimation(elm);
                }
            }
        }
        if (!tabletFlg && !mobileFlg) {
            if (!isNoWait($(elm).attr("class"))) {
                for (let className of classNames) {
                    result = className.match(ANIMS_NAME_REGEXP);
                    if (result !== null) {
                        animName = result[0].split('_')[1];
                        anims = getAnimations(animName);
                        animData = generateTransformCSS(anims.animations[0].animData);
                        $(elm).css('transform', animData.join(' '));
                    }
                }
                // set hide class
                if (($(window).height() + $(window).scrollTop()) < $(elm).offset().top) {
                    $(elm).addClass('fuHide');
                }
            } else {
                fadeUpAnimsElms.splice(i, 1);
                i--;
                startFadeUpContinuousAnimation(elm);
            }
        }
        if (fadeUpAnimsElms.length === 0) { break; }
    };

    $(window).scroll(() => {
        // start one animation
        if (fadeUpElms.length > 0) {
            fadeUpElms.each((index, elm) => {
                if (elm !== undefined) {
                    if (($(window).height() + $(window).scrollTop()) > $(elm).offset().top) {
                        startFadeUpOneAnimation(elm);
                        fadeUpElms.splice(index, 1);
                    }
                }
            });
        }

        //start continuous animations
        if (fadeUpAnimsElms.length > 0) {
            fadeUpAnimsElms.each((index, elm) => {
                if (elm !== undefined) {
                    if (($(window).height() + $(window).scrollTop()) > $(elm).offset().top) {
                        startFadeUpContinuousAnimation(elm);
                        fadeUpAnimsElms.splice(index, 1);
                    }
                }
            });
        }
    });
}

/**
 * start fade up one animation 
 * @param elm animation target element
 */
const startFadeUpOneAnimation = (elm) => {
    let classNames = $(elm).attr("class").split(' ');
    let delayFlg = false;
    let result = null;
    let delayData = [];
    let delayTime = 0;
    for (let className of classNames) {
        result = className.match(DELAY_REGEXP);
        if (result !== null) {
            delayData = result[0].split('_');
            delayTime = delayData[1];
            setTimeout(() => {
                fadeUp(elm);
            }, delayTime);
            delayFlg = true;
        }
    }
    if (!delayFlg) {
        fadeUp(elm)
    }
}

/**
 * fade up
 * @param elm animation target element
 */
const fadeUp = (elm) => {
    if (!$(elm).hasClass('fuDisp')) {
        let className = null;
        let classNames = $(elm).attr("class").split(' ');
        let classNamesStr = $(elm).attr("class");
        let checkResults = checkExistAnimData(classNamesStr);
        let pcResult = null;
        let tabletResult = null;
        let mobileResult = null;
        let result = null;
        let posData = null;
        let existAnimData = false;
        let animData = [];
        let animTime = 0;

        for (className of classNames) {
            // set end position
            // translation
            pcResult = className.match(TRANSLATE_REGEXP);
            tabletResult = className.match(TRANSLATE_TABLET_REGEXP);
            mobileResult = className.match(TRANSLATE_MOBILE_REGEXP);
            if (pcResult !== null || tabletResult !== null || mobileResult !== null) {
                if (isTablet() && checkResults[0] && checkResults[1]) {
                    if (tabletResult !== null) {
                        tabletResult = tabletResult[0];
                        if (checkTranslateTabletFormat(tabletResult)) {
                            posData = tabletResult.split('_');
                            if (posData.length > 4) {
                                animData.push(generateTranslateCSS(tabletResult, false));
                            } else {
                                animData.push('translate(0px, 0px)');
                            }
                        }
                    }
                } else if (isMobile() && checkResults[0] && checkResults[2]) {
                    if (mobileResult !== null) {
                        mobileResult = mobileResult[0];
                        if (checkTranslateMobileFormat(mobileResult)) {
                            posData = mobileResult.split('_');
                            if (posData.length > 4) {
                                animData.push(generateTranslateCSS(mobileResult, false));
                            } else {
                                animData.push('translate(0px, 0px)');
                            }
                        }
                    }
                } else {
                    if (pcResult !== null) {
                        pcResult = pcResult[0];
                        if (checkTranslateFormat(pcResult)) {
                            posData = pcResult.split('_');
                            if (posData.length > 4) {
                                animData.push(generateTranslateCSS(pcResult, false));
                            } else {
                                animData.push('translate(0px, 0px)');
                            }
                        }
                    }
                }
            }

            //scale
            pcResult = className.match(SCALE_REGEXP);
            tabletResult = className.match(SCALE_TABLET_REGEXP);
            mobileResult = className.match(SCALE_MOBILE_REGEXP);
            if (pcResult !== null || tabletResult !== null || mobileResult !== null) {
                if (isTablet() && checkResults[3] && checkResults[4]) {
                    if (tabletResult !== null) {
                        tabletResult = tabletResult[0];
                        if (checkScaleTabletFormat(tabletResult)) {
                            posData = tabletResult.split('_');
                            if (posData.length > 4) {
                                animData.push(generateScaleCSS(tabletResult, false));
                            } else {
                                animData.push(`scale3d(1.0, 1.0, 1.0)`);
                            }
                        }
                    }
                } else if (isMobile() && checkResults[3] && checkResults[5]) {
                    if (mobileResult !== null) {
                        mobileResult = mobileResult[0];
                        if (checkScaleMobileFormat(mobileResult)) {
                            posData = mobileResult.split('_');
                            if (posData.length > 4) {
                                animData.push(generateScaleCSS(mobileResult, false));
                            } else {
                                animData.push(`scale3d(1.0, 1.0, 1.0)`);
                            }
                        }
                    }
                } else {
                    if (pcResult !== null) {
                        pcResult = pcResult[0];
                        if (checkScaleFormat(pcResult)) {
                            posData = pcResult.split('_');
                            if (posData.length > 4) {
                                animData.push(generateScaleCSS(pcResult, false));
                            } else {
                                animData.push(`scale3d(1.0, 1.0, 1.0)`);
                            }
                        }
                    }
                }
            }

            //skew
            pcResult = className.match(SKEW_REGEXP);
            tabletResult = className.match(SKEW_TABLET_REGEXP);
            mobileResult = className.match(SKEW_MOBILE_REGEXP);
            if (pcResult !== null || tabletResult !== null || mobileResult !== null) {
                if (isTablet() && checkResults[6] && checkResults[7]) {
                    if (tabletResult !== null) {
                        tabletResult = tabletResult[0];
                        if (checkSkewTabletFormat(tabletResult)) {
                            posData = tabletResult.split('_');
                            if (posData.length > 4) {
                                animData.push(generateSkewCSS(tabletResult, false));
                            } else {
                                animData.push(`skew(0deg, 0deg)`);
                            }
                        }
                    }
                } else if (isMobile() && checkResults[6] && checkResults[8]) {
                    if (mobileResult !== null) {
                        mobileResult = mobileResult[0];
                        if (checkSkewMobileFormat(mobileResult)) {
                            posData = mobileResult.split('_');
                            if (posData.length > 4) {
                                animData.push(generateSkewCSS(mobileResult, false));
                            } else {
                                animData.push(`skew(0deg, 0deg)`);
                            }
                        }
                    }
                } else {
                    if (pcResult !== null) {
                        pcResult = pcResult[0];
                        if (checkSkewFormat(pcResult)) {
                            posData = pcResult.split('_');
                            if (posData.length > 4) {
                                animData.push(generateSkewCSS(pcResult, false));
                            } else {
                                animData.push(`skew(0deg, 0deg)`);
                            }
                        }
                    }
                }
            }

            //rotate
            pcResult = className.match(ROTATE_REGEXP);
            tabletResult = className.match(ROTATE_TABLET_REGEXP);
            mobileResult = className.match(ROTATE_MOBILE_REGEXP);
            if (pcResult !== null || tabletResult !== null || mobileResult !== null) {
                if (isTablet() && checkResults[9] && checkResults[11]) {
                    if (tabletResult !== null) {
                        tabletResult = tabletResult[0];
                        if (checkRotateTabletFormat(tabletResult)) {
                            posData = tabletResult.split('_');
                            if (posData.length > 4) {
                                animData.push(generateRotateCSS(tabletResult, false));
                            } else {
                                animData.push(`rotateX(0deg) rotateY(0deg) rotateZ(0deg)`);
                            }
                        }
                    }
                } else if (isMobile() && checkResults[9] && checkResults[10]) {
                    if (mobileResult !== null) {
                        mobileResult = mobileResult[0];
                        if (checkRotateMobileFormat(mobileResult)) {
                            posData = mobileResult.split('_');
                            if (posData.length > 4) {
                                animData.push(generateRotateCSS(mobileResult, false));
                            } else {
                                animData.push(`rotateX(0deg) rotateY(0deg) rotateZ(0deg)`);
                            }
                        }
                    }
                } else {
                    if (pcResult !== null) {
                        pcResult = pcResult[0];
                        if (checkRotateFormat(pcResult)) {
                            posData = pcResult.split('_');
                            if (posData.length > 4) {
                                animData.push(generateRotateCSS(pcResult, false));
                            } else {
                                animData.push(`rotateX(0deg) rotateY(0deg) rotateZ(0deg)`);
                            }
                        }
                    }
                }
            }
        }

        $(elm).css('transform', animData.join(' '));

        // set animation duration and timing function
        for (className of classNames) {
            result = className.match(TIME_REGEXP);
            if (result !== null) {
                animData = result[0].split('_');
                if (animData.length === 2) {
                    animTime = animData[1]
                    $(elm).css('transition-duration', `${animTime}ms`);
                }
                existAnimData = true;
            }

            //timing function
            result = className.match(TIME_FUNC_REGEXP);
            if (result !== null) {
                animData = result[0].split('_');
                if (animData.length === 2) {
                    animTime = animData[1]
                    $(elm).css('transition-timing-function', `${animTime}`);
                }
            }
        }

        if (!existAnimData) {
            $(elm).css('transition-duration', '2000ms');
        }

        $(elm).removeClass('fuHide').addClass('fuDisp');
    }
}

/**
 * start fade up continuous animation
 * @param elm animation target element
 */
const startFadeUpContinuousAnimation = (elm) => {
    if (!$(elm).hasClass('fuDisp')) {
        execAnimation(elm);
        $(elm).removeClass('fuHide').addClass('fuDisp');
    }
}

/**
 * exec continuous animation
 * @param elm HTML Element 
 */
const execAnimation = (elm) => {
    let animName = getAnimName(elm);
    let anims = getAnimations(animName);
    let classNames = [];
    let classNamesStr = anims.animations[anims.currentAnim].animData;
    let animData = [];
    let animDuration = 0;
    let checkResults = checkExistAnimData(classNamesStr);
    let pcResult = null;
    let mobileResult = null;
    let result = null;
    let timeFunc = '';

    if (anims.currentAnim < anims.animations.length - 1) {
        anims.currentAnim++;
        classNames = anims.animations[anims.currentAnim].animData.split(' ');
        animData = [];
        for (let className of classNames) {
            // set end position
            // translation
            pcResult = className.match(TRANSLATE_REGEXP);
            tabletResult = className.match(TRANSLATE_TABLET_REGEXP);
            mobileResult = className.match(TRANSLATE_MOBILE_REGEXP);
            if (pcResult !== null || tabletResult !== null || mobileResult !== null) {
                if (isTablet() && checkResults[0] && checkResults[1]) {
                    if (tabletResult !== null) {
                        tabletResult = tabletResult[0];
                        if (checkTranslateTabletFormat(tabletResult)) {
                            animData.push(generateTranslateCSS(tabletResult, true));

                        }
                    }
                } else if (isMobile() && checkResults[0] && checkResults[2]) {
                    if (mobileResult !== null) {
                        mobileResult = mobileResult[0];
                        if (checkTranslateMobileFormat(mobileResult)) {
                            animData.push(generateTranslateCSS(mobileResult, true));

                        }
                    }
                } else {
                    if (pcResult !== null) {
                        pcResult = pcResult[0];
                        if (checkTranslateFormat(pcResult)) {
                            animData.push(generateTranslateCSS(pcResult, true));
                        }
                    }
                }
            }

            //scale
            pcResult = className.match(SCALE_REGEXP);
            tabletResult = className.match(SCALE_TABLET_REGEXP);
            mobileResult = className.match(SCALE_MOBILE_REGEXP);
            if (pcResult !== null || tabletResult !== null || mobileResult !== null) {
                if (isTablet() && checkResults[3] && checkResults[5]) {
                    if (tabletResult !== null) {
                        tabletResult = tabletResult[0];
                        if (checkScaleTabletFormat(tabletResult)) {
                            animData.push(generateScaleCSS(tabletResult, true));
                        }
                    }
                } else if (isMobile() && checkResults[3] && checkResults[4]) {
                    if (mobileResult !== null) {
                        mobileResult = mobileResult[0];
                        if (checkScaleMobileFormat(mobileResult)) {
                            animData.push(generateScaleCSS(mobileResult, true));
                        }
                    }
                } else {
                    if (pcResult !== null) {
                        pcResult = pcResult[0];
                        if (checkScaleFormat(pcResult)) {
                            animData.push(generateScaleCSS(pcResult, true));
                        }
                    }
                }
            }

            //skew
            pcResult = className.match(SKEW_REGEXP);
            tabletResult = className.match(SKEW_TABLET_REGEXP);
            mobileResult = className.match(SKEW_MOBILE_REGEXP);
            if (pcResult !== null || tabletResult !== null || mobileResult !== null) {
                if (isTablet() && checkResults[6] && checkResults[7]) {
                    if (tabletResult !== null) {
                        tabletResult = tabletResult[0];
                        if (checkSkewTabletFormat(tabletResult)) {
                            animData.push(generateSkewCSS(tabletResult, true));
                        }
                    }
                } else if (isMobile() && checkResults[6] && checkResults[8]) {
                    if (mobileResult !== null) {
                        mobileResult = mobileResult[0];
                        if (checkSkewMobileFormat(mobileResult)) {
                            animData.push(generateSkewCSS(mobileResult, true));
                        }
                    }
                } else {
                    if (pcResult !== null) {
                        pcResult = pcResult[0];
                        if (checkSkewFormat(pcResult)) {
                            animData.push(generateSkewCSS(pcResult, true));
                        }
                    }
                }
            }

            //rotate
            pcResult = className.match(ROTATE_REGEXP);
            tabletResult = className.match(ROTATE_TABLET_REGEXP);
            mobileResult = className.match(ROTATE_MOBILE_REGEXP);
            if (pcResult !== null || tabletResult !== null || mobileResult !== null) {
                if (isTablet() && checkResults[9] && checkResults[10]) {
                    if (tabletResult !== null) {
                        tabletResult = tabletResult[0];
                        if (checkRotateTabletFormat(tabletResult)) {
                            animData.push(generateRotateCSS(tabletResult, true));
                        }
                    }
                } else if (isMobile() && checkResults[9] && checkResults[11]) {
                    if (mobileResult !== null) {
                        mobileResult = mobileResult[0];
                        if (checkRotateMobileFormat(mobileResult)) {
                            animData.push(generateRotateCSS(mobileResult, true));
                        }
                    }
                } else {
                    if (pcResult !== null) {
                        pcResult = pcResult[0];
                        if (checkRotateFormat(pcResult)) {
                            animData.push(generateRotateCSS(pcResult, true));
                        }
                    }
                }
            }

            // time function
            result = className.match(TIME_FUNC_REGEXP);
            if (result !== null) {
                result = result[0];
                timeFunc = result.split('_')[1];
            }
        }

        animDuration = anims.animations[anims.currentAnim].animDuration;

        $(elm).css('transform', animData.join(' '));
        $(elm).css('transition-duration', `${animDuration}ms`);

        if (timeFunc !== '') {
            $(elm).css('transition-timing-function', timeFunc);
        }

        //check last animation
        if (anims.currentAnim === anims.animations.length - 1) {
            if (anims.loop) {
                anims.currentAnim = anims.loopStart - 1;
                setTimeout(() => {
                    execAnimation(elm);
                }, animDuration);
            }
        } else {
            setTimeout(() => {
                execAnimation(elm);
            }, animDuration);
        }
    }

}

/**
 * generate translate CSS
 * @param animData animation data
 * @param timing true:start, false: end
 */
const generateTranslateCSS = (animData, timing) => {
    try {
        if (!timing && animData.length < 5) { throw new Error("mistaken translate arguments"); }
    } catch (e) { }
    let xIndex = timing ? 1 : 4;
    let yIndex = timing ? 2 : 5;
    let unitIndex = timing ? 3 : 6;
    let posData = animData.split('_');
    return `translate(${posData[xIndex]}${posData[unitIndex]}, ${posData[yIndex]}${posData[unitIndex]})`;
}

/**
 * generate Scale CSS
 * @param animData animation data
 * @param timing true:start, false: end
 */
const generateScaleCSS = (animData, timing) => {
    try {
        if (!timing && animData.length < 5) { throw new Error("mistaken scale arguments"); }
    } catch (e) { }
    let xIndex = timing ? 1 : 4;
    let yIndex = timing ? 2 : 5;
    let zIndex = timing ? 3 : 6;
    let scaleData = animData.split('_');
    return `scale3d(${scaleData[xIndex]}, ${scaleData[yIndex]}, ${scaleData[zIndex]})`;
}

/**
 * generate skew CSS
 * @param animData animation data
 * @param timing true:start, false: end
 */
const generateSkewCSS = (animData, timing) => {
    try {
        if (!timing && animData.length < 4) { throw new Error("mistaken skew arguments"); }
    } catch (e) { }
    let xIndex = timing ? 1 : 3;
    let yIndex = timing ? 2 : 4;
    let skewData = animData.split('_');
    return `skew(${skewData[xIndex]}deg, ${skewData[yIndex]}deg)`;
}

/**
 * generate rotate CSS
 * @param animData animation data
 * @param timing true:start, false: end
 */
const generateRotateCSS = (animData, timing) => {
    try {
        if (!timing && animData.length < 5) { throw new Error("mistaken rotate arguments"); }
    } catch (e) { }
    let xIndex = timing ? 1 : 4;
    let yIndex = timing ? 2 : 5;
    let zIndex = timing ? 3 : 6;
    let rotateData = animData.split('_');
    return `rotateX(${rotateData[xIndex]}deg) rotateY(${rotateData[yIndex]}deg) rotateZ(${rotateData[zIndex]}deg)`;
}

/**
 * getTransformCSS
 * @param classNames 
 * @returns animData
 */
const generateTransformCSS = (classNamesStr) => {
    let classNames = classNamesStr.split(' ');
    let className = '';
    let animData = [];
    let check_results = checkExistAnimData(classNamesStr);
    let pcResult = null;
    let mobileResult = null;

    for (className of classNames) {
        // set start position
        // translation
        pcResult = className.match(TRANSLATE_REGEXP);
        mobileResult = className.match(TRANSLATE_MOBILE_REGEXP);
        if (pcResult !== null || mobileResult !== null) {
            //translate
            if (isMobile() && check_results[0] && check_results[1]) {
                if (mobileResult !== null) {
                    mobileResult = mobileResult[0];
                    if (checkTranslateMobileFormat(mobileResult)) {
                        animData.push(generateTranslateCSS(mobileResult, true));
                    }
                }
            } else {
                if (pcResult !== null) {
                    pcResult = pcResult[0];
                    if (checkTranslateFormat(pcResult)) {
                        animData.push(generateTranslateCSS(pcResult, true));
                    }
                }
            }
        }

        //scale
        pcResult = className.match(SCALE_REGEXP);
        mobileResult = className.match(SCALE_MOBILE_REGEXP);
        if (pcResult !== null || mobileResult !== null) {
            if (isMobile() && check_results[2] && check_results[3]) {
                if (mobileResult !== null) {
                    mobileResult = mobileResult[0];
                    if (checkScaleMobileFormat(mobileResult)) {
                        animData.push(generateScaleCSS(mobileResult, true));
                    }
                }
            } else {
                if (pcResult !== null) {
                    pcResult = pcResult[0];
                    if (checkScaleFormat(pcResult)) {
                        animData.push(generateScaleCSS(pcResult, true));
                    }
                }
            }
        }

        //skew
        pcResult = className.match(SKEW_REGEXP);
        mobileResult = className.match(SKEW_MOBILE_REGEXP);
        if (pcResult !== null || mobileResult !== null) {
            if (isMobile() && check_results[4] && check_results[5]) {
                if (mobileResult !== null) {
                    mobileResult = mobileResult[0];
                    if (checkSkewMobileFormat(mobileResult)) {
                        animData.push(generateSkewCSS(mobileResult, true));
                    }
                }
            } else {
                if (pcResult !== null) {
                    pcResult = pcResult[0];
                    if (checkSkewFormat(pcResult)) {
                        animData.push(generateSkewCSS(pcResult, true));
                    }
                }
            }
        }

        //rotate
        pcResult = className.match(ROTATE_REGEXP);
        mobileResult = className.match(ROTATE_MOBILE_REGEXP);
        if (pcResult !== null || mobileResult !== null) {
            if (isMobile() && check_results[6] && check_results[7]) {
                if (mobileResult !== null) {
                    mobileResult = mobileResult[0];
                    if (checkRotateMobileFormat(mobileResult)) {
                        animData.push(generateRotateCSS(mobileResult, true));
                    }
                }
            } else {
                if (pcResult !== null) {
                    pcResult = pcResult[0];
                    if (checkRotateFormat(pcResult)) {
                        animData.push(generateRotateCSS(pcResult, true));
                    }
                }
            }
        }
    }
    return animData;
}

/**
 * get animation name
 * @param elm HTML Element
 * @returns animation name 
 */
const getAnimName = (elm) => {
    let classNames = $(elm).attr("class").split(' ');
    let className = '';
    let result = null;
    for (className of classNames) {
        result = className.match(ANIMS_NAME_REGEXP);
        if (result !== null) {
            return result[0].split('_')[1];
        }
    }
}

/**
 * get animations
 * @param animName animation name
 */
const getAnimations = (animName) => {
    let animations = null;
    for (animations of animGroups) {
        if (animations.name === animName) {
            return animations;
        }
    }
}

/**
 * check traslate format
 * @param className
 * @return result
 */
const checkTranslateFormat = (className) => {
    let result = TRANSLATE_CHECK_REGEXP.test(className);
    if (!result) {
        console.log(`mistaken translate class name ${className}`);
    }
    return result;
}

/**
 * check traslate tablet format
 * @param className
 * @return result
 */
const checkTranslateTabletFormat = (className) => {
    let result = TRANSLATE_TABLET_CHECK_REGEXP.test(className);
    if (!result) {
        console.log(`mistaken translate tablet class name ${className}`);
    }
    return result;
}

/**
 * check traslate mobile format
 * @param className
 * @return result
 */
const checkTranslateMobileFormat = (className) => {
    let result = TRANSLATE_MOBILE_CHECK_REGEXP.test(className);
    if (!result) {
        console.log(`mistaken translate mobile class name ${className}`);
    }
    return result;
}

/**
 * check scale format
 * @param className
 * @return result
 */
const checkScaleFormat = (className) => {
    let result = SCALE_CHECK_REGEXP.test(className);
    if (!result) {
        console.log(`mistaken scale class name ${className}`);
    }
    return result;
}

/**
 * check scale tablet format
 * @param className
 * @return result
 */
const checkScaleTabletFormat = (className) => {
    let result = SCALE_TABLET_CHECK_REGEXP.test(className);
    if (!result) {
        console.log(`mistaken scale tablet class name ${className}`);
    }
    return result;
}

/**
 * check scale mobile format
 * @param className
 * @return result
 */
const checkScaleMobileFormat = (className) => {
    let result = SCALE_MOBILE_CHECK_REGEXP.test(className);
    if (!result) {
        console.log(`mistaken scale mobile class name ${className}`);
    }
    return result;
}

/**
 * check skew format
 * @param className
 * @return result
 */
const checkSkewFormat = (className) => {
    let result = SKEW_CHECK_REGEXP.test(className);
    if (!result) {
        console.log(`mistaken skew class name ${className}`);
    }
    return result;
}

/**
 * check skew tablet format
 * @param className
 * @return result
 */
const checkSkewTabletFormat = (className) => {
    let result = SKEW_TABLET_CHECK_REGEXP.test(className);
    if (!result) {
        console.log(`mistaken skew tablet class name ${className}`);
    }
    return result;
}

/**
 * check skew mobile format
 * @param className
 * @return result
 */
const checkSkewMobileFormat = (className) => {
    let result = SKEW_MOBILE_CHECK_REGEXP.test(className);
    if (!result) {
        console.log(`mistaken skew mobile class name ${className}`);
    }
    return result;
}

/**
 * check rotate format
 * @param className
 * @return result
 */
const checkRotateFormat = (className) => {
    let result = ROTATE_CHECK_REGEXP.test(className);
    if (!result) {
        console.log(`mistaken rotate class name ${className}`);
    }
    return result;
}

/**
 * check rotate tablet format
 * @param className
 * @return result
 */
const checkRotateTabletFormat = (className) => {
    let result = ROTATE_TABLET_CHECK_REGEXP.test(className);
    if (!result) {
        console.log(`mistaken rotate tablet class name ${className}`);
    }
    return result;
}

/**
 * check rotate mobile format
 * @param className
 * @return result
 */
const checkRotateMobileFormat = (className) => {
    let result = ROTATE_MOBILE_CHECK_REGEXP.test(className);
    if (!result) {
        console.log(`mistaken rotate mobile class name ${className}`);
    }
    return result;
}

/**
 * check screen tablet size
 * @return true:tablet, false: other
 */
const isTablet = () => {
    return TAB_BREAKPOINT >= window.innerWidth && window.innerWidth > MOB_BREAKPOINT;
}

/**
 * check screen mobile size
 * @return true:mobile, false: other
 */
const isMobile = () => {
    return MOB_BREAKPOINT >= window.innerWidth ? true : false;
}

/**
 * check no wait
 * @param className
 * @return result
 */
const isNoWait = (className) => {
    if (className.match(NOWAIT_CHECK_REGEXP) !== null) {
        return true;
    }
    return false;
}

/**
 * checkExistAnimData
 * @param classNames
 * @return checkResult exist:true, other:false 
 *                     0:translate, 1:translate tablet, 2:translate mobile, 3:scale, 4:scale tablet, 5:scale mobile, 6:skew, 7: skew tablet, 8: skew mobile, 9:rotate, 10: rotate tablet, 11: rotate mobile
 */
const checkExistAnimData = (classNames) => {
    let checkResult = [];
    let regExps = [TRANSLATE_REGEXP, TRANSLATE_TABLET_REGEXP, TRANSLATE_MOBILE_REGEXP, SCALE_REGEXP, SCALE_TABLET_REGEXP, SCALE_MOBILE_REGEXP, SKEW_REGEXP, SKEW_TABLET_REGEXP, SKEW_MOBILE_REGEXP, ROTATE_REGEXP, ROTATE_TABLET_REGEXP, ROTATE_MOBILE_REGEXP];
    let result = null;
    let regExp = null;
    for (regExp of regExps) {
        result = classNames.match(regExp);
        checkResult.push(result !== null ? true : false);
    }
    return checkResult;
}


$(() => {
    initFadeUp();
});