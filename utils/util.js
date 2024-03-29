const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const parseDom = dom =>{
  var nodes = [];
  var links = [];
  for(let i=0;i<dom.length;i++){
    if(dom[i].type=='text'){
      nodes.push({ name: 'div', children: [{ type: 'text', text: dom[i].value }]});
      const wxreg = /https:\/\/mp.weixin.qq.com\/s\//g;
      if(wxreg.test(dom[i].value)){
        const start = dom[i].value.search(wxreg);
        if(start>=0){
          var link = dom[i].value.slice(start,);
          const end = link.indexOf(' ');
          if(end>0){
            link = link.slice(0,end);
          }
          links.push(link);
        }
      }
    }else if(dom[i].type=='img'){
      nodes.push({name:'div',children:[{name:'img',attrs:{src:dom[i].value,width:'300px'}}]});
    }
  }
  console.log('nodes',nodes);
  console.log('links',links);
  return [nodes,links];
}

module.exports = {
  formatTime: formatTime,
  parseDom:parseDom
}
