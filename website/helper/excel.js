//导出例子
// var fileName = '员工信息' + data.now + '.xlsx',
//     exportData = [];
// var tableHead = [
//     '员工编号',
//     '邮箱',
//     '姓名',
//     '电话',
//     '部门',
//     '直属上级',
//     '入职日期',
//     '参加工作日期',
//     '正式合同起始日期',
//     '离职日期',
//     '实习/兼职',
//     '在职/离职',
//     '状态'
// ]
// exportData.push(tableHead);
// data.totalUsers.forEach(function(item) {
//     exportData.push([
//         item.company_id,
//         item.email,
//         item.name,
//         item.tel,
//         item.team_name,
//         item.supervisor_name,
//         item.date_started,
//         item.date_graduated,
//         item.date_joined,
//         item.date_quit,
//         item.internship_name,
//         item.job_name,
//         item.enabled_name
//     ])
// });
// save(fileName, exportData);
import { saveAs } from 'file-saver';
import XLSX from 'xlsx';

const s2ab = s => {
    let buf;
    if (typeof ArrayBuffer !== 'undefined') {
        buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i != s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
    } else {
        buf = new Array(s.length);
        for (let i = 0; i != s.length; ++i) {
            buf[i] = s.charCodeAt(i) & 0xFF;
        }

    }
    return buf;
};

const xlsHaddle = {
    dataSave(name, data){
        let wb = XLSX.utils.book_new(),
            st = XLSX.utils.aoa_to_sheet(data);

        wb.SheetNames.push('sheet1');
        wb.Sheets['sheet1'] = st;

        let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'binary'});
        try {
            saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), name);
        } catch (e) {
            console.log(e, wbout);
        }
        return wbout;
    },

    tableSave(element) {
        if(element.indexOf('#') !== -1) {
            let str = element.slice(1);
            element = document.getElementById(str);
            if(element.length === 0) {
                console.error('请传入表单id');
                return;
            }
        }else if(element.indexOf('.') !== -1) {
            let str = element.slice(1);
            element = document.getElementsByClassName(str);
            if (element.length > 1 || element.length === 0 ) {
                console.error('传入的表必须是唯一');
                return;
            }else{
                element = element[0];
            }
        }

        let et = XLSX.utils.table_to_book(element); //此处传入table的DOM节点
        let etout = XLSX.write(et, {
            bookType: 'xlsx',
            bookSST: true,
            type: 'array'
        });
        try {
            saveAs(new Blob([etout], {
                type: 'application/octet-stream'
            }), 'trade-publish.xlsx');   //trade-publish.xlsx 为导出的文件名
        } catch (e) {
            console.log(e, etout);
        }
        return etout;
    }
};

export default xlsHaddle;
