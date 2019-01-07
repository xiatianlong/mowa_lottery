/**
 * 抽奖逻辑代码实现
 * created by xiatl on 2019-01-07
 */

$(function () {

    // 初始化
    $("#stopBtn").hide(); //隐藏停止按钮


    // 启停开关
    let doing;
    // 单个中奖人
    let luckyUser;
    // 初始化总数据
    let dataArr = data;

    /**
     * 添加奖项
     */
    $("#addLotterySelectBtn").on('click', function () {
        let inputVal = $("#lotterySelectItemInput").val();
        if (!inputVal) {
            alert("请输入...");
            return false;
        }

        // 存储Item信息
        let lotteryResult = localStorage.getItem("lotterySelectItem");
        if (!lotteryResult) {
            lotteryResult = JSON.stringify([]);
        }
        lotteryResult = JSON.parse(lotteryResult);
        lotteryResult.push({"value": inputVal, "text": inputVal});
        localStorage.setItem("lotterySelectItem", JSON.stringify(lotteryResult));

        $("#lotterySelectItemInput").val("");
        appendSelectItemHandle();
    });

    /**
     * 添加奖项处理
     */
    let appendSelectItemHandle = function () {
        let lotterySelectItem = localStorage.getItem("lotterySelectItem");
        if (lotterySelectItem) {
            lotterySelectItem = JSON.parse(lotterySelectItem);
            $("#lotterySelect").empty();
            for (let i = 0; i < lotterySelectItem.length; i++) {
                $("#lotterySelect").append('<option value="' + lotterySelectItem[i].value + '">' + lotterySelectItem[i].text + '</option>')
            }
        }

    }

    /**
     * 开始按钮点击
     */
    $("#startBtn").on('click', function () {
        let lotterySelectValue = $("#lotterySelect").val();
        if (!lotterySelectValue) {
            alert("请添加奖项");
            return false;
        }
        // 按钮控制
        $(this).hide();
        $("#stopBtn").show();

        doing = setInterval(function () {
            luckyUser = lotteryHandle();
        }, 30);

    });

    /**
     * 停止按钮点击
     */
    $("#stopBtn").on('click', function () {
        // 按钮控制
        $(this).hide();
        $("#startBtn").show();

        // 停止
        clearInterval(doing);

        // 存储中奖信息
        let lotterySelectValue = $("#lotterySelect").val();
        let lotteryResult = localStorage.getItem("lotteryResult");
        if (!lotteryResult) {
            lotteryResult = JSON.stringify([]);
        }
        lotteryResult = JSON.parse(lotteryResult);
        lotteryResult.push({"level": lotterySelectValue, "user": luckyUser});
        localStorage.setItem("lotteryResult", JSON.stringify(lotteryResult));


        removeSelectedData();
        showLuckyList();
    });

    /**
     * 清楚全部緩存
     */
    $("#clearBtn").on('click', function () {
        localStorage.clear();
        window.location.reload();
    });

    /**
     * 删除已经中奖的人
     */
    let removeSelectedData = function () {
        // 已选出的元素
        for (let i = 0; i < dataArr.length; i++) {

            let lotteryResult = localStorage.getItem("lotteryResult");
            if (lotteryResult) {
                lotteryResult = JSON.parse(lotteryResult);
                for (let j = 0; j < lotteryResult.length; j++) {
                    if (dataArr[i] === lotteryResult[j].user) {
                        dataArr.splice(i, 1);
                    }
                }
            }
        }
    };

    /**
     * 执行抽奖
     * @returns {*}
     */
    let lotteryHandle = function () {
        if (!dataArr || dataArr.length <= 0) {
            alert("没有能够参加抽奖的人了");
            clearInterval(doing);
            $("#stopBtn").hide();
            $("#startBtn").show();
            return false;
        }
        // 产生随机数
        let randomNum = Math.floor(Math.random() * dataArr.length);
        // 产生中奖人
        let lucky = dataArr[randomNum];
        // 画面显示实时选择人
        $("#showLotteryIngData").text(lucky);
        return lucky;
    }

    /**
     * 显示中奖结果
     */
    let showLuckyList = function () {
        let lotteryResult = localStorage.getItem("lotteryResult");
        if (lotteryResult) {
            lotteryResult = JSON.parse(lotteryResult);
            $("#showResultContent").empty();
            for (let i = 0; i < lotteryResult.length; i++) {
                $("#showResultContent").append('<div><span>' + lotteryResult[i].level + '</span>:<span>' + lotteryResult[i].user + '</span></div>')
            }
        }
    };


    removeSelectedData();
    appendSelectItemHandle();
    showLuckyList();
});