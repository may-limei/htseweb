
    var worldStationDom = document.getElementById("world-station");
    worldStationDom.style.width=document.getElementById("station1").clientWidth/2.3+"px";
    worldStationDom.style.height=document.getElementById("station1").clientHeight/1.2+"px";
    worldStationDom.style.padding="1rem";
    var worldStationChart = echarts.init(worldStationDom);
    var app = {};
    worldStationOption = null;
    app.title = '坐标轴刻度与标签对齐';
    
    worldStationOption = {
        title: {
            text: '截至2017年全球公共加氢站数量',
            left: 'center',
        },
        legend: {
          data: ['公共加氢站'],
          align: 'left',
        },
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['日本', '德国', '美国', '法国', '中国', '韩国', '英国', '丹麦', '挪威', '瑞典', '奥地利', '芬兰'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:[94, 45, 20, 14, 12, 12, 11, 8, 4, 4, 2]
            }
        ]
    };
    ;
    if (worldStationOption && typeof worldStationOption === "object") {
        worldStationChart.setOption(worldStationOption, true);
    }

    


  var mapDom = document.getElementById("map");
  mapDom.style.width=document.getElementById("station1").clientWidth/2+"px";
  mapDom.style.height=document.getElementById("station1").clientWidth/3.1+"px";;
  var mapChart = echarts.init(mapDom);
// var app = {};
mapOption = null;
var data = [
    {name: '北京永丰加氢站', value: 1},
    {name: '上海神力加氢站', value: 1},
    {name: '上海电驱动加氢站', value: 1},
    {name: '上海安亭加氢站', value: 1},
    {name: '郑州宇通加氢站', value: 1},
    {name: '大连新源加氢站', value: 1},
    {name: '江苏如皋加氢站', value: 1},
    {name: '氢枫能源（十堰）东风特汽加氢站', value: 1},
    {name: '四川能投加氢站', value: 1},
    {name: '中山大洋电机加氢站', value: 1},
    {name: '佛山加氢站', value: 1},
    {name: '云浮加氢站', value: 1},
    {name: '深圳大运加氢站', value: 1},
    {name: '南通百应加氢站', value: 1},
    {name: '常熟丰田加氢站', value: 1},
];

var geoCoordMap = {
   '江苏如皋加氢站':[121.15,31.89],
   '南通百应加氢站':[121.05,32.08],
   '云浮加氢站':[112.02,22.93],
   '上海神力加氢站':[121.6,30.9],
   '上海电驱动加氢站':[121.3,30.9],
   '上海安亭加氢站':[121.24,31.28],
   '常熟丰田加氢站':[120.74,31.64],
   '中山大洋电机加氢站':[113.38,22.52],
   '深圳大运加氢站':[114.07,22.62],
   '佛山加氢站':[113.11,23.05],
   '大连新源加氢站':[121.62,38.92],
   '四川能投加氢站':[104.06,30.67],
   '北京永丰加氢站':[116.46,39.92],
   '氢枫能源（十堰）东风特汽加氢站':[111.3,30.7],
   '郑州宇通加氢站':[114.48,38.03],
};

function convertData(data) {
   var res = [];
   for (var i = 0; i < data.length; i++) {
       var geoCoord = geoCoordMap[data[i].name];
       if (geoCoord) {
           res.push({
               name: data[i].name,
               value: geoCoord.concat(data[i].value)
           });
       }
   }
   return res;
};

mapOption = {
    tooltip: {
      padding: 0,
    },
    visualMap: {
        min: 0,
        max: 4,
        left: 'right',
        top: 'center',
        text: ['High','Low'],
        seriesIndex: [1],
        inRange: {
            color: ['#bfbfbf', '#759aa0', '#8dc1a9', '#e69d87', '#dd6b66']
        },
        calculable : true
    },
    geo: {
        map: 'china',
        roam: true,
        scaleLimit: {min:1, max:6},
        label: {
            normal: {
                show: true,
                textStyle: {
                    color: 'rgba(0,0,0,0.4)'
                }
            }
        },
        itemStyle: {
            normal:{
                borderColor: 'rgba(0, 0, 0, 0.2)',
                borderColor: 'rgba(255, 255, 255, 0.7)',
                borderWidth: 1.6
            },
            emphasis:{
                areaColor: null,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 18,
                borderWidth: 1.6,
                borderColor: 'rgba(255, 255, 255, 0.7)',
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    },
    series : [
       {
           type: 'scatter',
           coordinateSystem: 'geo',
           data: convertData(data),
           symbolSize: 5,
           tooltip: {
               formatter: '{b}'
           },
           itemStyle: {
               normal: {
                    color: '#37475f'
               }
           }
        },
        {
            name: '加氢站数量',
            type: 'map',
            geoIndex: 0,
            data:[
                {name: '北京', value: 1},//
                {name: '上海', value: 3},//
                {name: '河北', value: 1},//
                {name: '辽宁', value: 1},//
                {name: '江苏', value: 3},//
                {name: '湖北', value: 1},//
                {name: '广东', value: 4},//
                {name: '四川', value: 1},//
                {name: '天津', value: 0},
                {name: '重庆', value: 0},
                {name: '河南', value: 0},
                {name: '云南', value: 0},
                {name: '黑龙江', value: 0},
                {name: '湖南', value: 0},
                {name: '安徽', value: 0},
                {name: '山东', value: 0},
                {name: '新疆', value: 0},
                {name: '浙江', value: 0},
                {name: '江西', value: 0},
                {name: '广西', value: 0},
                {name: '甘肃', value: 0},
                {name: '山西', value: 0},
                {name: '内蒙古', value: 0},
                {name: '陕西', value: 0},
                {name: '吉林', value: 0},
                {name: '福建', value: 0},
                {name: '贵州', value: 0},
                {name: '青海', value: 0},
                {name: '西藏', value: 0},
                {name: '宁夏', value: 0},
                {name: '海南', value: 0},
                {name: '台湾', value: 0},
                {name: '香港', value: 0},
                {name: '澳门', value: 0}
            ]
        }
    ]
};;
if (mapOption && typeof mapOption === "object") {
    mapChart.setOption(mapOption, true);
}