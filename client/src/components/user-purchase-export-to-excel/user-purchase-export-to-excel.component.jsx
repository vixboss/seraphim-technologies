import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import * as XLSX from 'xlsx';
import * as XlsxPopulate from 'xlsx-populate/browser/xlsx-populate';
import { ReactComponent as ExcelLogo } from './../../assets/excel.svg';
import { convertDateInEST, convertTimeInEST } from '../../factory';


const ExportUserPurchaseExcel = ({data}) => {
    const handleDownloadExcelSheet = () => {
        handleExport().then((url) => {
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute('href', url);
            downloadAnchorNode.setAttribute('download', 'user_purchased_report.xlsx');
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        });
    }

    const s2ab = (s) => {
        const buff = new ArrayBuffer(s.length);
        const view = new Uint8Array(buff);
        for(let i = 0; i !== s.length; ++i){
            view[i] = s.charCodeAt(i);
        }
        return buff;
    }

    const workBook2Blob = (workbook) => {
        const wbOpts = {
            bookType: 'xlsx',
            type: 'binary'
        }
        const wbOut = XLSX.write(workbook, wbOpts);

        const blob = new Blob([s2ab(wbOut)], {
            type: 'application/octet-stream'
        });
        return blob;
    }

    const handleExport = () => {
        const title = [{ A: "User's Purchase Details:"}, {}];
        let table1 = [{
            A: 'S_No',
            B: 'Payer',
            C: 'Email',
            D: 'Order ID',
            E: 'Purchase Date',
            F: 'Product',
            G: 'Quantity',
            H: 'Unit Amount($)',
            I: 'Total Amount($)',
            J: 'Gross Amount($)',
            K: 'Discount($)',
            L: 'Amount Payable($)',
            M: 'Delivery Date',
            N: 'Delivery Time',
            O: 'Merchant',
            P: 'Status'
        }];

        let count = 0;
        data.forEach((row) => {
            const items = row.items;
            items.forEach((item) => {
                count++;
                table1.push({
                    A: count,
                    B: row.name,
                    C: row.email,
                    D: row.order_id,
                    E: convertDateInEST(row.createdAt),
                    F: item.description,
                    G: item.quantity,
                    H: item.unit_amount,
                    I: (item.quantity * item.unit_amount).toFixed(2),
                    J: row.total_amount,
                    K: (row.total_amount - row.gross_amount).toFixed(2),
                    L: row.gross_amount,
                    M: item.createdAt !== row.createdAt ? convertDateInEST(item.createdAt) : '',
                    N: item.createdAt !== row.createdAt ? convertTimeInEST(item.createdAt) : '',
                    O: row.merchant,
                    P: !!item.deliveryStatus.data[0] ? 'Delivered' : 'Un-Delivered'
                });
            });
        });

        const finalData = title.concat(table1);

        // Create a Workbook.
        const wb = XLSX.utils.book_new();

        // Create a Worksheet.
        const sheet = XLSX.utils.json_to_sheet(finalData,{
            skipHeader: true
        });

        //Append worksheet to workbook.
        XLSX.utils.book_append_sheet(wb, sheet, 'users_purchase_report');

        // Create a Blob.   
        const workBookBlob = workBook2Blob(wb);

        const dataInfo = {
            titleCell: 'A2',
            titleRange: 'A1:P2',
            tHeaderRange: 'A3:P3',
            tbodyRange: `A4:P${finalData.length}`
        };

        return addStyles(workBookBlob, dataInfo, data, finalData);
    }

    const addStyles = (workBookBlob, dataInfo, data, finalData) => {
        return XlsxPopulate.fromDataAsync(workBookBlob).then(workbook => {
            workbook.sheets().forEach(sheet => {
                sheet.column('B').width(20);
                sheet.column('C').width(40);
                sheet.column('D').width(30);
                sheet.column('E').width(20);
                sheet.column('F').width(100);
                sheet.column('H').width(20);
                sheet.column('I').width(20);
                sheet.column('J').width(20);
                sheet.column('K').width(15);
                sheet.column('L').width(20);
                sheet.column('M').width(20);
                sheet.column('N').width(20);
                sheet.column('O').width(20);
                sheet.column('P').width(20);

                sheet.range(dataInfo.titleRange).merged(true).style({
                    bold: true,
                    fill: 'C8C8C8',
                    horizontalAlignment: 'center',
                    verticalAlignment: 'center'
                });

                sheet.range(dataInfo.tbodyRange).style({
                    horizontalAlignment: 'center'
                });

                sheet.range(dataInfo.tHeaderRange).style({
                    fill: 'FFFD04',
                    bold: true,
                    horizontalAlignment: 'center'
                });

                let newRangeForStatus = 4;
                finalData.forEach((newData) => {
                    if(newData['P'] === 'Delivered' || newData['P'] === 'Un-Delivered'){
                        sheet.range(`P${newRangeForStatus}:P${newRangeForStatus}`).style({
                            fontColor: newData['P'] === 'Delivered' ? '008040' : 'FF3333'
                        });
                        newRangeForStatus = newRangeForStatus + 1;
                    }
                });

                let rangeFrom = 4;
                data.forEach(newData => {
                    var rangeTo = newData.itemLength - 1; //2
                    sheet.range(`J${rangeFrom}:J${rangeFrom + rangeTo}`).merged(true).style({
                        horizontalAlignment: 'center',
                        verticalAlignment: 'center'
                    });
                    sheet.range(`K${rangeFrom}:K${rangeFrom + rangeTo}`).merged(true).style({
                        horizontalAlignment: 'center',
                        verticalAlignment: 'center'
                    });
                    sheet.range(`L${rangeFrom}:L${rangeFrom + rangeTo}`).merged(true).style({
                        bold: true,
                        horizontalAlignment: 'center',
                        verticalAlignment: 'center'
                    });
                    rangeFrom = (rangeFrom + rangeTo) + 1;
                });
            });

            return workbook.outputAsync().then(workbookBlob => URL.createObjectURL(workbookBlob));
        });
    }

    return(
        <>
            <Tooltip title="Export To Excel">
                <ExcelLogo onClick={handleDownloadExcelSheet} style = {{marginLeft: 'auto', cursor: 'pointer'}}/>
            </Tooltip>
        </>
    );
}

export default ExportUserPurchaseExcel; 