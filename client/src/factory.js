import moment from 'moment-timezone';

export const productDetailArrayFilter = (productObject) => {
    const filteredProductObject =[];
    for(var firstArrayVariable = 0; firstArrayVariable < productObject.length; firstArrayVariable++){
        if(productObject[firstArrayVariable] !== ''){
            for(var secondArrayVariable = 0; secondArrayVariable < productObject[firstArrayVariable].length; secondArrayVariable++){
                if(productObject[firstArrayVariable][secondArrayVariable] !== ''){
                    filteredProductObject.push(productObject[firstArrayVariable][secondArrayVariable]);
                }
            }
        }
    }
    return filteredProductObject;
}

export const checkUndefined = (obj) => {
    if(typeof(obj) !== "undefined") {
        return obj;
    }
    else{
        return '';
    }
}

export const uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

// Convert IST to EST
export const currentDateAndTimeInEST = (date) => {
    // var d = new Date();
    var myTimezone = "America/New_York";
    var myDatetimeFormat= "ddd MMM D yyyy hh:mm:ss a z";
    var myDatetimeString = moment(date).tz(myTimezone).format(myDatetimeFormat);
    return (myDatetimeString);
}
export const paragraphToList = (para) => {
    var finalList = [];
    var newArray= [];

    for(var firstLoopVariable=0; firstLoopVariable < para.length; firstLoopVariable++){
        if(Object.keys(para[firstLoopVariable]).length !== 0){
            newArray = para[firstLoopVariable].split('.'||',');
            newArray = newArray.filter(filterUndefined => filterUndefined);
            var finalArray = [];
            for(var secondLoopVariable = 0; secondLoopVariable < newArray.length; secondLoopVariable++){
                finalArray.push(newArray[secondLoopVariable].toString().trim());
            }
            finalList.push(finalArray);
        }
    }
    return (finalList);
}

export const collectionArrayMerging = (collection) => {
    const itemArray = [];
    var count = 0;
    for(var index = 0; index < collection.length; index++){
        for(var secondLoopIndex = 0; secondLoopIndex < collection[index].items.length; secondLoopIndex++) {
            var title = collection[index].title;
            var titleId = collection[index].id;
            count++;
            var newObject = {...collection[index].items[secondLoopIndex]};
            newObject.title = title;
            newObject.titleId = titleId;
            newObject.count = count;
            itemArray.push(newObject);
        }
    }
    // var collectionArray = createPagination(itemArray, pagination);
    return itemArray;
}

export const changeObjectValueToKeyValue = (arrayObject) => {
    var obj = {};
    arrayObject.map((field) => {
        var detailField = Object.values(field)[0];
        var detailTypeField = Object.values(field)[1];
        Object.assign(obj, {[detailField]: detailTypeField});
    });
    return obj;
}

export const createPagination = (itemArray, pagination) => {
    var {offSet, tableData, orgTableData, perPage, currentPage, pageCount} = pagination;
    const slice = itemArray.slice(parseInt(offSet), parseInt(offSet) + parseInt(perPage));
    pageCount = Math.ceil(itemArray.length / parseInt(perPage));
    orgTableData = itemArray;
    tableData = slice;
    var obj = {};
    obj.pageCount = pageCount;
    obj.orgTableData = orgTableData;
    obj.tableData = tableData;
    return obj
}

export const onPaginationClick = (number, pagination) => {
    const paginationOffSet = (number - 1) * pagination.perPage;
    const paginationData = pagination;
    paginationData.offSet = paginationOffSet;
    paginationData.currentPage = number;
    return paginationData;
}

export const onHandleLastPage = (newCollection, pagination) => {
    const lastPage = newCollection.pageCount;
    pagination.offSet = (lastPage -1) * pagination.perPage;
    pagination.currentPage = lastPage;
    return pagination;
}

export const onHandleFirstPage = (pagination) => {
    const firstPage = 1;
    pagination.offSet = (firstPage -1) * pagination.perPage;
    pagination.currentPage = firstPage;
    return pagination;
}

export const onHandlePrevPage = (pagination) => {
    const prevPage = pagination.currentPage - 1;
    pagination.offSet = (prevPage -1) * pagination.perPage;
    pagination.currentPage = prevPage;
    return pagination;
}

export const onHandleNextPage = (pagination) => {
    const nextPage = (pagination.currentPage === 0) ? pagination.currentPage + 2 : pagination.currentPage + 1;
    pagination.offSet = (nextPage -1) * pagination.perPage;
    pagination.currentPage = nextPage;
    console.log(pagination);

    return pagination;
}

export const convertDate = (dt) => {
    var date = new Date(dt);
    var year = date.toLocaleString('en-us', {year: 'numeric'});
    var month = date.toLocaleString('en-us', {month: '2-digit'});
    var day = date.toLocaleString('en-us', {day: '2-digit'});

    return (year + '-' + month + '-' + day);
}

Object.defineProperty(String.prototype, 'capitalizeFirstCharacter', {
    value: function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});

Object.defineProperty(String.prototype, 'convertToDate', {
    value: function() {
        var date = new Date(this).toLocaleString('en-us', {day: '2-digit'});
        var month = new Date(this).toLocaleString('en-us', {month: 'short'});
        var year = new Date(this).toLocaleString('en-us', {year: 'numeric'});
        var day = new Date(this).toLocaleString('en-us', {weekday: 'short'});

        return day + ' ' + month + ' ' + date + ' ' + year;
       
    },
    enumerable: false
});

Object.defineProperty(String.prototype, 'convertToTime', {
    value: function() {
        return new Date(this).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    },
    enumerable: false
});

(function(){
    if (typeof Object.defineProperty === 'function'){
      try{Object.defineProperty(Array.prototype,'sortBy',{value:sb}); }catch(e){}
    }
    if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;
  
    function sb(f){
      for (var i=this.length;i;){
        var o = this[--i];
        this[i] = [].concat(f.call(o,o,i),o);
      }
      this.sort(function(a,b){
        for (var i=0,len=a.length;i<len;++i){
          if (a[i]!=b[i]) return a[i]<b[i]?-1:1;
        }
        return 0;
      });
      for (var i=this.length;i;){
        this[--i]=this[i][this[i].length-1];
      }
      return this;
    }
  })();