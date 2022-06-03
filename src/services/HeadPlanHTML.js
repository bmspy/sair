import React, {useState, useEffect} from 'react';
import {
  format,
  subDays,
  isThisMonth,
  eachWeekendOfMonth,
  addMonths,
  getMonth,
  setHours,
  differenceInCalendarDays,
  isFirstDayOfMonth,
} from 'date-fns';
import {ar} from 'date-fns/locale';

export const HeadPlanHTML = (planDetailsData, fullName, job, planDetailsDate) =>
  //   '<table><tr><th style="text-align:center; direction: rtl;">تفاصيل الخطة</th></tr><tr></tr></table>';
  `<!DOCTYPE html>
  <html dir="rtl" lang="ar">
      <head>
          <style>
              .table1 {
              width: 100%;
              border-spacing: 0;
              /* border-collapse: collapse; */
              border-collapse: separate;
              border-spacing: 0 1em;
              }
              .table2 {
              width: 100%;
              border-spacing: 0;
              border-collapse: collapse;
              /* border-collapse: separate; */
              border-spacing: 0 1em;
              }
              tr {
                  margin-top: 100px;
              }
              th {
              text-align: center;
              }
              th,
              td {  
              width: 10%;
              /* border: 1px solid teal; */
              text-align: center;
              }
              .gap {
              width: 10%;
              }
              .head {
                  border-top: thin solid; 
                  border-bottom: thin solid;
              }
              .center {
                margin: auto;
                width: 30%;
                text-align: center;
                color: #10B1B1;
                }
          </style>
      </head>
      <h1 class="center">تطبيق ساير</h1>
      <h4>الإسم: ${fullName}</h2>
      <h4>المهنة: ${job}</h2>
      <h2>تفاصيل الخطة</h2>
      <hr />
  <table class="table1">
      <thead>
      <tr>
          <th>السنة</th>
          <th>الشهر</th>
          <th>المدة</th>
      </tr>
  </thead>
  <tbody>
      <tr>
        <th>${planDetailsData?.year}</th>
          <th>${format(
            new Date(`${planDetailsDate?.planDetailsYear}-${planDetailsDate?.planDetailsMonth}`),
            'MMM',
            {locale: ar},
          )}</th>
          <th>${planDetailsData?.duration} يوم</th>
      </tr>
  </tbody>
  </table>
  <table class="table2">
      <thead class="head">
      <tr class="head">
          <th>التاريخ</th>
          <th>الوجهة</th>
          <th>طريقة الذهاب</th>
      </tr>
  </thead>
  <tbody id="myList">
  ${planDetailsData?.plans?.map(
    item =>
      `<tr>
      <td>${format(new Date(item?.date), 'd eeee', {locale: ar})}</td>
      <td>${item.destination_name}</td>
      <td>${item.go_method ? 'سائق' : 'سيارة خاصة'}</td>
    </tr>`
  )}
  </tbody>
  </table>
  <div style="margin-top: 3rem;">
  <span>تم تصدير الخطة بتاريخ ${format(new Date(), 'yyyy-MM-dd')}</span>
  </div>
  </html>`;

