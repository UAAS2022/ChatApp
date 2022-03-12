import React, { useState, useEffect } from 'react';

//日付から文字列に変換する関数
export const dateToString = (date: Date, format_str: String) => {

    const year_str = String(date.getFullYear());
    //月だけ+1すること
    const month_str = String(1 + date.getMonth());
    const day_str = String(date.getDate());
    const hour_str = String(date.getHours());
    const minute_str = String(date.getMinutes());
    const second_str = String(date.getSeconds());


    // let format_str = 'YYYY-MM-DD hh:mm:ss';
    format_str = format_str.replace(/YYYY/g, year_str);
    format_str = format_str.replace(/MM/g, month_str);
    format_str = format_str.replace(/DD/g, day_str);
    format_str = format_str.replace(/hh/g, hour_str);
    format_str = format_str.replace(/mm/g, minute_str);
    format_str = format_str.replace(/ss/g, second_str);

    return format_str;
};

//日付から文字列に変換する関数(0埋めあり)
export const dateToString_Zero = (date: Date, format_str: String) => {

    const year_str = String(date.getFullYear());
    //月だけ+1すること
    let month_str = String(1 + date.getMonth());
    let day_str = String(date.getDate());
    let hour_str = String(date.getHours());
    let minute_str = String(date.getMinutes());
    let second_str = String(date.getSeconds());

    month_str = ('0' + month_str).slice(-2);
    day_str = ('0' + day_str).slice(-2);
    hour_str = ('0' + hour_str).slice(-2);
    minute_str = ('0' + minute_str).slice(-2);
    second_str = ('0' + second_str).slice(-2);

    // let format_str = 'YYYY-MM-DD hh:mm:ss';
    format_str = format_str.replace(/YYYY/g, year_str);
    format_str = format_str.replace(/MM/g, month_str);
    format_str = format_str.replace(/DD/g, day_str);
    format_str = format_str.replace(/hh/g, hour_str);
    format_str = format_str.replace(/mm/g, minute_str);
    format_str = format_str.replace(/ss/g, second_str);

    return format_str;
};