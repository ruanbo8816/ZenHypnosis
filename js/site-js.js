$(function () {
  var hypnosis = new Vue({
    el: '#app',
    data: {
        showbox: 1, //动画框
        hsnum:0, //总数
        hscont:0, //计数
        jishi:5,
        hs:'1',
        hsList: [],
        musicpl:'01',
        ScreenLight:50,
        musicList: [
          {name:'白度母心咒（推荐）',value:'M01'},
          {name:'莲师心咒',value:'M02'},
          {name:'观音十法',value:'M03'},
          {name:'般若心咒',value:'M04'},
          {name:'藏传大悲咒',value:'M05'},
        ],
        hsanimen: false,//显示和尚动画
        shuomin:'',
        daoj: 5,
        songUrl: '../music/sd.mp3',
    },  
    
    methods: {
      pushMonk(page) {
        return new Promise((res, _) => {
          let ys=0;
          const this2 = page;
          const addhs = setInterval(function(){
            if (ys==0) {
              this2.setData({
                hsanimen: true,
              }) 	
              this2.musicone("../music/sd.mp3");
            }
            ys++;
            if(ys==2){
              const pleft = this2.random(6,85);
              const ptop = this2.random(10,60);
              const monkcls = 'monksmall'+this2.data.hs;
              const hitem = {class:monkcls,top:ptop+'vw',left:pleft+'vw'};
              const jisu = this2.data.hscont+1;
              this2.setData({
                hsList: this2.data.hsList.concat(hitem),
                hsanimen: false,
                hscont: jisu,
              }) 	
              if(jisu == this2.data.hsnum){
                this2.setData({
                  showbox: 6,
                }) 	
                this2.step6();
              }
              clearInterval(addhs);  
            }
            res();
            },5000);		
        })
      },
      backmusic() {
        // bgsond();
        // function bgsond() {
        //   back.title = "雨声 ";   // 必须
        //   back.src = "../music/ys.mp3";
        //   back.onEnded(() => {
        //     bgsond();  // 音乐循环播放
        //   })
        // }
      },
      musicone(url) {  
        // back2.title = "一声"; 
        // back2.src = url;
        // back2.play();
      },
      gzsm() {  
        // back4.title = "规则说明"; 
        // back4.src =  "../music/gzsm.mp3";
        // back4.play();
      },
      haqian() { 
        const backhq = back3;
        const zs = (this.data.hsnum*5)/30;
        let hqs=1;
        const jishihq = setInterval(function(){ 
          hqs++;
          if (hqs>zs) {
            clearInterval(jishihq);  
          }else{
            backhq.title = "哈欠声"; 
            backhq.src = "../music/hq.mp3";
            backhq.play();
          }
        },30000); 
      },
      musicloop(url) {  
        // back.title = "雨声禅音 ";   // 必须
        // back.src = url;    
        // back.onEnded(() => {
        //   this.musicloop(url);  // 音乐循环播放
        // })
      },
      random: function(s,l) { //计算随机数  
        const sjs = Math.floor(Math.random()*(l-s)+s);
        if (sjs == undefined) {
          this.random(s,l)
        }else{
          return sjs;
        }
      },
      daojs() {
        this.showbox= 4;
        const thisb = this;
        let daoj2 = this.daoj;
        const daojishi = setInterval(function(){ 
          daoj2--;
          if (daoj2==0) {
            thisb.starrun();
            clearInterval(daojishi);   
          }else{
            thisb.jishi= daoj2,
          }
          },1000); 
      },
      starrun() { 
        const musicurl = "../music/" + "nj"+this.data.musicpl+".mp3"
        this.musicloop(musicurl); //念经背景音
        this.haqian(); //哈欠音
        this.showbox= 5,
        for ( let i=1; i <= this.data.hsnum; i++ ) {
          this.pushMonk(this);
          this.hs=this.random(1,4)
        }
      },
      onLoad() {
        this.backmusic();
      },
      step0() {
          this.showbox=1,
      },
      step1() {
          this.showbox=2,
      },
      step2(e) {
        const lg = Number(e.currentTarget.dataset.lg);
        const sm = Number(e.currentTarget.dataset.sm);
        const hstotle = this.random(sm,lg);
        this.hsnum= hstotle,
        this.hscont=0,
        this.hsList= [],
        this.showbox= 7,
      },
      step4() {     
        this.hsnum=0, 
        this.hscont=0, 
        this.jishi=5,
        this.hsList= [],
        this.showbox= 2,
      },
      step5() {
        this.hsnum=0, 
        this.hscont=0, 
        this.jishi=5,
        this.hsList= [],
        this.showbox= 2,
 
      },
      step6() {
        this.daoj = 5;
        this.hscont=0, 
        this.jishi=5,
        this.hsList= [],      
      },
      step7(e) {    
        this.musicpl=e.currentTarget.dataset.v,
        this.showbox= 3,
      },
    },    
    mounted:function () {          
    },
  });
});