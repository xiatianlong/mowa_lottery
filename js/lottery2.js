/**
 * 抽奖逻辑代码实现
 * created by xiatl on 2019-10-20
 */

$(function () {


    // 启停开关
    let doing;
    // 初始化总数据
    let dataArr = data.concat(cheat);
    // cheat
    let cheatArr= cheat;



    /**
     * 开始按钮点击
     */
    $("#beginBtn").on('click', function () {

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
        lotteryResult.push(cheatUser);
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
        for (let i = 0; i < cheatArr.length; i++){
            if (lotteryResult.indexOf(cheatArr[i]) < 0){
                return cheatArr[i];
            }

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
            $("#result").empty();
            for (let i = 0; i < lotteryResult.length; i++) {
                $("#result").append('<span>' + lotteryResult[i] + '</span>')
            }
        }
    };


    showLuckyList();
});