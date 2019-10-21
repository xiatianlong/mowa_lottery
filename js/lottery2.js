/**
 * 抽奖逻辑代码实现
 * created by xiatl on 2019-10-20
 */

$(function () {


    // 启停开关
    let doing;
    // 初始化总数据
    let dataArr = data.concat(cheat).concat(cheat2).concat(cheat3);
    // cheat
    let cheatArr= cheat;
    let cheatArr2= cheat2;
    let cheatArr3= cheat3;
    // type
    let type = null;


    /**
     * 抽奖类型选择
     */
    $("input[name='lotteryType']").on('change', function(){
        type = $(this).val();
        showLuckyList();
    });

    /**
     * 开始按钮点击
     */
    $("#beginBtn").on('click', function () {

        if (type == null){
            alert("请选择抽奖类型");
            return;
        }

        // 按钮控制
        $(this).hide();
        $("#endBtn").show();

        doing = setInterval(function () {
            lotteryHandle();
        }, 30);

    });

    /**
     * 停止按钮点击
     */
    $("#endBtn").on('click', function () {
        // 按钮控制
        $(this).hide();
        $("#beginBtn").show();

        // 停止
        clearInterval(doing);

        // 存储中奖信息
        let lotteryResult = localStorage.getItem("lotteryResult");
        if (!lotteryResult) {
            lotteryResult = JSON.stringify([]);
        }
        lotteryResult = JSON.parse(lotteryResult);
        // 从cheatArr里拿一个人中奖
        let cheatUser = getAcheatUser();
        $("#doing").text("中奖人：" + cheatUser);
        lotteryResult.push({"type": type, "user": cheatUser});
        localStorage.setItem("lotteryResult", JSON.stringify(lotteryResult));

        showLuckyList();
    });

    /**
     * 获取中奖人
     * @returns {string}
     */
    let getAcheatUser = function(){
        let lotteryResult = localStorage.getItem("lotteryResult");
        if (!lotteryResult) {
            lotteryResult = JSON.stringify([]);
        }
        lotteryResult = JSON.parse(lotteryResult);
        let resultArr = [];
        for (let i = 0; i < lotteryResult.length; i++){
            resultArr.push(lotteryResult[i].type + "-" + lotteryResult[i].user)
        }
        if (type === "lotteryType1"){
            for (let i = 0; i < cheatArr.length; i++){
                if (resultArr.indexOf("lotteryType1-" + cheatArr[i]) < 0){
                    return cheatArr[i];
                }

            }
        }
        if (type === "lotteryType2"){
            for (let i = 0; i < cheatArr2.length; i++){
                if (resultArr.indexOf("lotteryType2-" + cheatArr2[i]) < 0){
                    return cheatArr2[i];
                }

            }
        }
        if (type === "lotteryType3"){
            for (let i = 0; i < cheatArr3.length; i++){
                if (resultArr.indexOf("lotteryType3-" + cheatArr3[i]) < 0){
                    return cheatArr3[i];
                }

            }
        }
        if (type === "lotteryType4"){
            // 产生随机数
            let randomNum = Math.floor(Math.random() * dataArr.length);
            // 产生中奖人
            return dataArr[randomNum];
        }

        return "无中奖人";

    }


    /**
     * 清楚全部緩存
     */
    $("#clearBtn").on('click', function () {
        localStorage.clear();
        window.location.reload();
    });


    /**
     * 执行抽奖
     * @returns {*}
     */
    let lotteryHandle = function () {
        // 产生随机数
        let randomNum = Math.floor(Math.random() * dataArr.length);
        // 产生中奖人
        let lucky = dataArr[randomNum];
        // 画面显示实时选择人
        $("#doing").text("中奖人：" + lucky);
    }

    /**
     * 显示中奖结果
     */
    let showLuckyList = function () {
        let lotteryResult = localStorage.getItem("lotteryResult");
        if (lotteryResult) {
            lotteryResult = JSON.parse(lotteryResult);
            for (let i = 0; i < lotteryResult.length; i++){
                if(lotteryResult[i].type !== type){
                    lotteryResult.splice(i, 1); // 将使后面的元素依次前移，数组长度减1
                    i--;
                }
            }
            $("#result").empty();
            for (let i = 0; i < lotteryResult.length; i++) {
                $("#result").append('<span>' + lotteryResult[i].user + '</span>')
            }
        }
    };


    showLuckyList();
});