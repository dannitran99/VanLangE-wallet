import React from 'react'
import { StyleSheet, Text, View, Image ,Dimensions} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {LineChart} from "react-native-chart-kit";
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import NumberFormat from 'react-number-format';
import axios from 'axios';
const Chart = (props) => {
    const { dataa } = props;
    const [current, setCurrent] = React.useState(0);
    const [data, setData] = React.useState([]);
    const [load, setLoad] = React.useState(false);
    const [totalmoney, setTotalmoney] = React.useState(0);
    const [labels, setLabels] = React.useState(Last7Days(0));
    const [datasets, setDatasets] = React.useState([0,0,0,0,0,0,0]);

    function Last7Days (x) {
      return '0123456'.split('').map(function(n) {
          var d = new Date();
          d.setDate(d.getDate() - 7*x - n);
          return (function(day, month) {
              return [day<10 ? '0'+day : day, month<10 ? '0'+month : month].join('/');
          })(d.getDate(), d.getMonth()+1);
      }).reverse();
    }
    function getDataChart(resData,resLabel){
      var newData = [0,0,0,0,0,0,0];
      var sum = 0;
      for(let i = 0; i< newData.length ; i++){
        var date = resLabel[i];
        var sub =date.split('/');
        for(let j = 0 ; j< resData.length ; j++){
          var itemDate = new Date(resData[j].date);
          if(sub[0]== itemDate.getDate() && sub[1] == (itemDate.getMonth()+1)) {
            newData[i] += resData[j].price;
            sum += resData[j].price;
          }
        }
      }
      setDatasets(newData);
      setTotalmoney(sum);
    }
    React.useEffect(() => {
        setLoad(true);
        axios.post('https://vlu-ewallet.herokuapp.com/payment/historyType',{
          type:dataa
        }).then(res =>{
           setData(res.data);
           getDataChart(res.data,Last7Days(0));
           setLoad(false);
         }).catch(err =>{
             console.error(err);
          })
    }, []);

    return (
      <>
        {dataa=='market'?(
          <Spinner
              visible={load}
              color='00b5ec'
              animation='slide'
          />
        ):undefined}
        <Text style={{fontSize:20}}>Thống kê doanh thu</Text>

        <LineChart
          data={{
            labels: labels,
            datasets: [{data:datasets,}]
          }}
          width={Dimensions.get("window").width-20} // from react-native
          height={220}
          yAxisSuffix="đ"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#6c6c6c",
            backgroundGradientFrom: "#6c6c6c",
            backgroundGradientTo: "#BBBBBB",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 20,
          }}
        />
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={{paddingHorizontal:20}} onPress={()=>minus()}>
          <Icon  name="chevron-left"size={20}  color='#4388D6'/>
        </TouchableOpacity>
        <Text>Từ ngày {labels[0]} đến ngày {labels[labels.length-1]}</Text>
        <TouchableOpacity style={{paddingHorizontal:20}} onPress={()=>add()}>
          <Icon  name="chevron-right"size={20}  color='#4388D6'/>
        </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',padding:30}}>
          <Text style={{flex:1,fontSize:17}}>Tổng doanh thu: </Text>
          <NumberFormat
             value={totalmoney}
             displayType={'text'}
             thousandSeparator={true}
             suffix={'đ'}
             renderText={formattedValue => <Text  style={{fontSize:17,fontWeight:'bold'}}>{formattedValue}</Text>} // <--- Don't forget this!
           />
        </View>
      </>
    );
    function minus(){
      let currentPage = current;
      setLabels(Last7Days(currentPage +1));
      setCurrent(currentPage+1);
      getDataChart(data,Last7Days(currentPage +1));
    }
    function add(){
      let currentPage = current;
      setLabels(Last7Days(currentPage -1));
      setCurrent(currentPage-1)
      getDataChart(data,Last7Days(currentPage -1));
    }
}

export default Chart

const styles = StyleSheet.create({

})
