import React, { useState, useEffect } from 'react';

export const c010_UaasUtil_isNotEmpty = (obj: any): boolean => {
    let errFlg = true
    if (obj == null) {
        errFlg = false
    } else if (obj == undefined) {
        errFlg = false
    } else if (obj == NaN) {
        errFlg = false
    }
    return errFlg
}

export const c010_UaasUtil_isNotBlank = (obj: any): boolean => {
    let errFlg = true
    if (obj == null) {
        errFlg = false
    } else if (obj == undefined) {
        errFlg = false
    } else if (obj == NaN) {
        errFlg = false
    } else if (obj == "") {
        errFlg = false
    }
    return errFlg
}