"use client";

import { useState, useEffect, useRef } from "react";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";

var fn="Inter,Helvetica Neue,Arial,sans-serif";
var mo="JetBrains Mono,SF Mono,Consolas,monospace";
var C={bg:"#1C1B18",sf:"#2A2925",ra:"#23221E",bd:"rgba(255,255,255,0.08)",tx:"#E8E4DE",tm:"rgba(232,228,222,0.65)",td:"rgba(232,228,222,0.35)",ac:"#E8580C",al:"rgba(232,88,12,0.12)",gn:"#4ADE80",rd:"#C93B2C",grn:"#1A7D42",pk:"#C43A7B",blue:"#60A5FA",blueAl:"rgba(96,165,250,0.12)",amber:"#FBBF24",amberAl:"rgba(251,191,36,0.12)",violet:"#A78BFA",violetAl:"rgba(167,139,250,0.12)",teal:"#2DD4BF",tealAl:"rgba(45,212,191,0.12)"};
var msgC={Magnus:"#60A5FA",Camilla:"#C43A7B",Gard:"#E8580C",Anders:"#4ADE80"};
var stC=[C.rd,C.grn,C.pk];

function FI(p){var s=useState(false);useEffect(function(){var t=setTimeout(function(){s[1](true)},p.delay||0);return function(){clearTimeout(t)}},[]);return <div style={Object.assign({opacity:s[0]?1:0,transform:s[0]?"translateY(0)":"translateY(20px)",transition:"opacity 0.6s ease, transform 0.6s ease"},p.style||{})}>{p.children}</div>}

/* ── Animated Step 1: Chaotic chat ── */
function Step1(){
  var is=useState(0);var idx=is[0];var setIdx=is[1];
  var containerRef=useRef(null);

  var noise=[
    {from:"Camilla",text:"Hvem skal ha med ekstra vester?"},
    {from:"Anders",text:"Loddsalget starter p\u00e5 l\u00f8rdag \u2014 alle m\u00e5 ta med minst ett hefte \ud83d\ude4f"},
    {from:"Magnus",text:"Kaker til kampen l\u00f8rdag \u2014 noen frivillige?"},
    {from:"Camilla",text:"Glemte n\u00f8kkelen til hallen, kan noen l\u00e5se opp?"},
    {from:"Anders",text:"Er det dugnad neste tirsdag?"},
    {from:"Gard",self:true,text:"Noen som har ekstra h\u00e5ndball?"},
    {from:"Camilla",text:"M\u00e5 hente Jonas tidlig i dag, kan noen andre kj\u00f8re?"},
    {from:"Magnus",text:"Kampen p\u00e5 l\u00f8rdag flyttet til kl 11"},
    {from:"Anders",text:"Sorry, m\u00e5 komme 10 min sent"},
    {from:"Camilla",text:"Fakturaen for cupen kom i dag \u2014 sjekk mail"},
    {from:"Magnus",text:"Noen som har bilder fra treningen?"},
    {from:"Anders",text:" \u2014 hvem har ansvar for oppvarmingen?"},
    {from:"Magnus",text:"Hva var planen for idag igjen?? \ud83d\ude05",climax:true},
  ];
  var delays=[2200,1400,1000,750,580,440,340,280,240,220,200,200,450];

  useEffect(function(){
    var ts=[];var acc=0;
    for(var i=0;i<delays.length;i++){acc+=delays[i];(function(n,t){ts.push(setTimeout(function(){setIdx(n)},t))})(i+1,acc)}
    return function(){ts.forEach(clearTimeout)};
  },[]);

  useEffect(function(){if(containerRef.current)containerRef.current.scrollTop=containerRef.current.scrollHeight},[idx]);

  var notifs=[
    {icon:"\ud83d\udcbc",from:"Jobben",text:"M\u00f8teinnkalling: Statusm\u00f8te kl 09",badge:3,col:C.blue},
    {icon:"\ud83c\udfe0",from:"Familien",text:"Hvem henter i dag?",badge:2,col:C.teal},
    {icon:"\u26bd",from:"Fotballgruppa",text:"Kamp l\u00f8rdag flyttet til kl 11",badge:5,col:C.amber},
  ];
  var notifCount=idx>=10?3:idx>=7?2:idx>=4?1:0;
  var climaxIdx=noise.length;
  var climactic=idx>=climaxIdx;
  var coachOp=idx>=9?0.22:idx>=6?0.5:idx>=3?0.78:1;

  return <div style={{maxWidth:420,margin:"0 auto"}}>
    <div style={{textAlign:"center",marginBottom:12}}><span style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(201,59,44,0.12)",border:"1px solid rgba(201,59,44,0.25)",borderRadius:8,padding:"5px 14px",fontSize:12,fontWeight:700,color:C.rd}}>{"Slik ser det ut i dag"}</span></div>
    <div style={{position:"relative"}}>
      {notifCount>0&&<div style={{position:"absolute",top:-8,left:"5%",right:"5%",zIndex:10,display:"flex",flexDirection:"column",gap:4}}>
        {notifs.slice(0,notifCount).map(function(n,i){return <div key={i} style={{background:"rgba(30,30,30,0.95)",borderRadius:12,padding:"8px 12px",display:"flex",alignItems:"center",gap:8,boxShadow:"0 4px 15px rgba(0,0,0,0.4)",border:"1px solid rgba(255,255,255,0.1)",animation:"slideD 0.3s ease"}}>
          <span style={{fontSize:14}}>{n.icon}</span>
          <div style={{flex:1,minWidth:0}}><div style={{fontSize:10,fontWeight:700,color:"#ccc"}}>{n.from}</div><div style={{fontSize:11,color:"#888",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{n.text}</div></div>
          <div style={{width:18,height:18,borderRadius:9,background:n.col,fontSize:9,fontWeight:800,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>{n.badge}</div>
        </div>})}
      </div>}
      <div style={{background:"#1a1a1a",borderRadius:24,padding:"12px 0",border:"2px solid #333",boxShadow:"0 8px 40px rgba(0,0,0,0.4)"}}>
        <div style={{display:"flex",justifyContent:"space-between",padding:"4px 20px 8px",fontSize:10,color:"#888"}}><span>17:00</span><div style={{width:50,height:4,borderRadius:2,background:"#444"}}/><span>85%</span></div>
        <div style={{padding:"10px 16px",borderBottom:"1px solid #2a2a2a",display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,borderRadius:"50%",background:"#333",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{"\ud83c\udfc8"}</div>
          <div style={{flex:1}}><div style={{fontSize:14,fontWeight:700,color:"#e0e0e0"}}>Trenerchat J2016 </div><div style={{fontSize:10,color:"#666"}}>Magnus, Camilla, Gard, Anders</div></div>
          {idx>=3&&<div style={{minWidth:22,height:22,padding:"0 6px",borderRadius:11,background:C.rd,fontSize:10,fontWeight:800,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>{idx}</div>}
        </div>
        <div ref={containerRef} style={{padding:"12px 14px",maxHeight:340,overflowY:"auto"}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",marginBottom:8,opacity:coachOp,transition:"opacity 0.5s"}}>
            <div style={{maxWidth:"85%",padding:"8px 12px",borderRadius:"14px 14px 4px 14px",background:"#E8580C",fontSize:12,lineHeight:1.4,color:"#fff"}}>{"Hei folkens! Plan for torsdag: starter 17:00. Oppvarming 10 min, pasningslek 4v4. Kast til trener 5 min. Stasjoner 40 min bytte 12 min: Magnus angrep 2v1, Camilla forsvar, jeg hinderl\u00f8ype. Avslutning p\u00e5 gangen."}</div>
            <span style={{fontSize:9,color:"#555",marginTop:2}}>14:36</span>
          </div>
          {noise.slice(0,idx).map(function(m,i){
            var col=msgC[m.from]||"#888";
            var isClimax=!!m.climax;
            var newer=idx-(i+1);
            var op=isClimax?1:newer>3?0.3:1;
            return <div key={i} style={{display:"flex",flexDirection:"column",alignItems:m.self?"flex-end":"flex-start",marginBottom:8,opacity:op,transition:"opacity 0.5s"}}>
              {!m.self&&<span style={{fontSize:10,fontWeight:700,color:col,marginBottom:2,marginLeft:4}}>{m.from}</span>}
              <div style={{maxWidth:m.self?"85%":"82%",padding:isClimax?"10px 14px":"8px 12px",borderRadius:m.self?"14px 14px 4px 14px":"14px 14px 14px 4px",background:m.self?"#E8580C":"#2a2a2a",fontSize:isClimax?14:13,lineHeight:1.45,color:m.self?"#fff":"#d0d0d0",fontWeight:isClimax?700:400,border:isClimax?"2px solid "+C.ac:"none",animation:isClimax?"fadeU 0.4s ease, pulse 1.8s ease 0.4s infinite":"fadeU 0.3s ease"}}>{m.text}</div>
            </div>
          })}
        </div>
      </div>
    </div>
  </div>;
}

/* ── Animated Step 2: Split editor ── */
function Step2(){
  var ps=useState(0);var ph=ps[0];var setPh=ps[1];
  var ts=useState("");var typed=ts[0];var setTyped=ts[1];
  var full="Oppvarming 10 min, pasningslek. Kast til trener 5 min. Stasjoner 40 min, bytte 12 min \u2014 angrep, forsvar, hinderl\u00f8ype. Avslutning.";

  useEffect(function(){
    setPh(0);setTyped("");
    var tt=[];var ti;
    tt.push(setTimeout(function(){setPh(1)},800));
    tt.push(setTimeout(function(){
      setPh(2);var idx=0;
      ti=setInterval(function(){idx++;if(idx<=full.length)setTyped(full.slice(0,idx));else clearInterval(ti)},14);
    },2200));
    var tDone=2200+full.length*14;
    tt.push(setTimeout(function(){setPh(3)},tDone+300));
    tt.push(setTimeout(function(){setPh(4)},tDone+900));
    tt.push(setTimeout(function(){setPh(5)},tDone+2400));
    var t6=tDone+2400+outBlocks.length*220+600;
    tt.push(setTimeout(function(){setPh(6)},t6));
    tt.push(setTimeout(function(){setPh(7)},t6+1800));
    tt.push(setTimeout(function(){setPh(8)},t6+3200));
    tt.push(setTimeout(function(){setPh(9)},t6+4400));
    return function(){tt.forEach(clearTimeout);if(ti)clearInterval(ti);};
  },[]);

  return <div style={{maxWidth:880,margin:"0 auto"}}>
    <div style={{textAlign:"center",marginBottom:20}}>
      <div style={{display:"inline-flex",alignItems:"center",gap:6,background:C.al,border:"1px solid rgba(232,88,12,0.25)",borderRadius:8,padding:"5px 14px",fontSize:11,fontWeight:800,color:C.ac,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>{"L\u00f8sningen"}</div>
      <h3 style={{fontSize:"clamp(22px,3.4vw,30px)",fontWeight:900,color:C.tx,margin:"0 0 8px",letterSpacing:"-0.5px",lineHeight:1.15}}>{"Hva om den meldingen gikk "}<span style={{color:C.ac}}>{"HIT"}</span>{" i stedet?"}</h3>
      <p style={{fontSize:14,color:C.tm,margin:"0 auto",maxWidth:480,lineHeight:1.55}}>{"Coachen beskriver \u00f8kten \u2014 Whistl bygger planen."}</p>
    </div>

    <div style={{position:"relative",background:"#161514",border:"1px solid rgba(255,255,255,0.12)",borderRadius:16,overflow:"hidden",boxShadow:"0 16px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05)"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,padding:"9px 14px",background:"linear-gradient(180deg,#2c2b28,#242320)",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
        <div style={{display:"flex",gap:6,marginRight:4}}>
          <span style={{width:10,height:10,borderRadius:5,background:"#ff5f57"}}/>
          <span style={{width:10,height:10,borderRadius:5,background:"#ffbd2e"}}/>
          <span style={{width:10,height:10,borderRadius:5,background:"#28c840"}}/>
        </div>
        <div style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:6,padding:"4px 10px",display:"flex",alignItems:"center",gap:6}}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          <span style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontFamily:mo}}>{"app.whistl.no"}</span>
        </div>
      </div>

      <div style={{background:"#201F1C"}}>
        <div style={{padding:"10px 18px",borderBottom:"1px solid rgba(255,255,255,0.06)",display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:15,fontWeight:900,color:C.ac,letterSpacing:"-0.5px"}}>{"whistl"}</span>
          <span style={{width:1,height:16,background:"rgba(255,255,255,0.08)",margin:"0 4px"}}/>
          <span style={{fontSize:13,color:C.tm,fontWeight:600}}>{"Ny \u00f8kt \u00b7 Torsdag 17. april"}</span>
        </div>

        <div className="s2split" style={{display:"flex",minHeight:360}}>
          <div className="s2chat" style={{flex:"0 0 40%",borderRight:"1px solid rgba(255,255,255,0.06)",display:"flex",flexDirection:"column",minHeight:360,background:"rgba(0,0,0,0.12)"}}>
            <div style={{padding:"8px 14px",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
              <span style={{fontSize:10,fontWeight:700,color:C.td,textTransform:"uppercase",letterSpacing:0.6}}>{"Chat med AI-assistent"}</span>
            </div>
            <div style={{flex:1,padding:"14px 14px",overflowY:"auto",display:"flex",flexDirection:"column",gap:12}}>
              {ph>=1&&<div style={{animation:"fadeU 0.4s ease"}}>
                <div style={{fontSize:9,fontWeight:700,color:C.td,marginBottom:4,textTransform:"uppercase",letterSpacing:0.5}}>{"Whistl AI"}</div>
                <div style={{maxWidth:"92%",padding:"10px 14px",borderRadius:"4px 14px 14px 14px",background:"rgba(255,255,255,0.06)",color:C.tx,fontSize:13,lineHeight:1.55}}>{"Hei Gard! Hva skal dere trene p\u00e5 i dag?"}</div>
              </div>}
              {ph>=2&&<div style={{animation:"fadeU 0.4s ease",display:"flex",flexDirection:"column",alignItems:"flex-end"}}>
                <div style={{fontSize:9,fontWeight:700,color:C.ac,marginBottom:4,letterSpacing:0.5}}>{"DEG"}</div>
                <div style={{maxWidth:"94%",padding:"10px 14px",borderRadius:"14px 4px 14px 14px",background:C.ac,color:"#fff",fontSize:13,lineHeight:1.55}}>
                  {ph===2?<span>{typed}<span style={{display:"inline-block",width:2,height:14,background:"#fff",marginLeft:1,verticalAlign:"middle",animation:"blink 0.8s step-end infinite"}}/></span>:full}
                </div>
              </div>}
              {ph>=4&&ph<6&&<div style={{animation:"fadeU 0.4s ease"}}>
                <div style={{fontSize:9,fontWeight:700,color:C.td,marginBottom:4,textTransform:"uppercase",letterSpacing:0.5}}>{"Whistl AI"}</div>
                <div style={{padding:"10px 14px",borderRadius:"4px 14px 14px 14px",background:"rgba(255,255,255,0.06)",display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:13,color:C.tx}}>{"Lager \u00f8ktplanen"}</span>
                  <span style={{display:"inline-flex",gap:3}}>
                    <span style={{width:5,height:5,borderRadius:3,background:C.ac,animation:"dot 1s ease infinite"}}/>
                    <span style={{width:5,height:5,borderRadius:3,background:C.ac,animation:"dot 1s ease infinite 0.2s"}}/>
                    <span style={{width:5,height:5,borderRadius:3,background:C.ac,animation:"dot 1s ease infinite 0.4s"}}/>
                  </span>
                </div>
              </div>}
              {ph>=6&&<div style={{animation:"fadeU 0.4s ease"}}>
                <div style={{fontSize:9,fontWeight:700,color:C.td,marginBottom:4,textTransform:"uppercase",letterSpacing:0.5}}>{"Whistl AI"}</div>
                <div style={{maxWidth:"92%",padding:"10px 14px",borderRadius:"4px 14px 14px 14px",background:"rgba(255,255,255,0.06)",color:C.tx,fontSize:13,lineHeight:1.55}}>{"Ferdig! Juster direkte i planen."}</div>
              </div>}
              {ph>=7&&<div style={{animation:"fadeU 0.4s ease"}}>
                <div style={{fontSize:9,fontWeight:700,color:C.td,marginBottom:4,textTransform:"uppercase",letterSpacing:0.5}}>{"Whistl AI"}</div>
                <div style={{maxWidth:"92%",padding:"10px 14px",borderRadius:"4px 14px 14px 14px",background:"rgba(255,255,255,0.06)",color:C.tx,fontSize:13,lineHeight:1.55}}>{"Skal jeg finne videoeksempler fra \u00f8velsesbanken til Norges H\u00e5ndballforbund?"}</div>
              </div>}
              {ph>=8&&<div style={{animation:"fadeU 0.4s ease",display:"flex",flexDirection:"column",alignItems:"flex-end"}}>
                <div style={{fontSize:9,fontWeight:700,color:C.ac,marginBottom:4,letterSpacing:0.5}}>{"DEG"}</div>
                <div style={{padding:"10px 14px",borderRadius:"14px 4px 14px 14px",background:C.ac,color:"#fff",fontSize:13}}>{"Ja, kj\u00f8r p\u00e5!"}</div>
              </div>}
            </div>
            <div style={{borderTop:"1px solid rgba(255,255,255,0.05)",padding:"10px 12px",display:"flex",gap:8,alignItems:"center"}}>
              <div style={{flex:1,background:"rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:10,padding:"9px 12px",fontSize:12,color:C.td}}>
                {ph<3?"Beskriv \u00f8kten\u2026":"Skriv for \u00e5 justere\u2026"}
              </div>
              <div style={{width:30,height:30,borderRadius:8,background:"rgba(255,255,255,0.04)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.td} strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>
              </div>
            </div>
          </div>

          <div className="s2plan" style={{flex:1,padding:"16px 18px",position:"relative",minHeight:360,overflow:"hidden"}}>
            <div style={{padding:"0 2px",marginBottom:12}}>
              <span style={{fontSize:10,fontWeight:700,color:C.td,textTransform:"uppercase",letterSpacing:0.6}}>{"\u00d8ktplan"}</span>
            </div>

            {ph<5&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",gap:10,minHeight:260,opacity:ph<4?0.6:0.3,transition:"opacity 0.5s"}}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.td} strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="12" y2="17"/></svg>
              <div style={{fontSize:13,color:C.tm,fontWeight:600}}>{"Planen dukker opp her"}</div>
              <div style={{fontSize:11,color:C.td,maxWidth:200,lineHeight:1.5}}>{"Beskriv \u00f8kten i chatten, s\u00e5 bygger vi den."}</div>
            </div>}

            {ph===4&&<div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,bottom:0,left:0,width:"45%",background:"linear-gradient(90deg,transparent,rgba(232,88,12,0.4),transparent)",animation:"beam 0.9s ease-out"}}/>
            </div>}

            {ph>=5&&<div style={{display:"flex",flexDirection:"column",gap:8}}>
              <div style={{marginBottom:2}}>
                <div style={{fontSize:15,fontWeight:900,color:C.tx,letterSpacing:"-0.3px"}}>{"Torsdags\u00f8kt \u2014 Pasning, Angrep og Forsvar"}</div>
                <div style={{display:"flex",gap:12,marginTop:4}}>
                  <span style={{fontSize:10,color:C.td,fontFamily:mo}}>{"17:00 \u2013 18:00"}</span>
                  <span style={{fontSize:10,color:C.td}}>{"4 blokker"}</span>
                  <span style={{fontSize:10,color:C.td}}>{"3 stasjoner"}</span>
                </div>
                <div style={{height:2,background:"linear-gradient(90deg,"+C.ac+",transparent)",marginTop:10,opacity:.25}}/>
              </div>
              {outBlocks.map(function(b,i){
                return <div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderLeft:"3px solid "+C.ac,borderRadius:10,padding:"10px 14px",animation:"fadeU 0.4s ease "+(i*0.18)+"s both"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontFamily:mo,fontSize:12,color:C.ac,fontWeight:800,minWidth:38}}>{b.time}</span>
                    <span style={{flex:1,fontSize:13,fontWeight:700,color:C.tx}}>{b.name}</span>
                    {b.split&&<span style={{fontSize:8,background:C.al,color:C.ac,padding:"2px 7px",borderRadius:10,fontWeight:700,letterSpacing:0.5}}>{"STASJONER"}</span>}
                    <span style={{fontFamily:mo,fontSize:11,color:C.td}}>{b.dur}</span>
                  </div>
                  {b.detail&&!b.split&&<p style={{margin:"5px 0 0 48px",fontSize:11,color:C.tm,lineHeight:1.5}}>{b.detail}</p>}
                  {b.cue&&!b.split&&<div style={{marginTop:5,marginLeft:48,background:C.al,borderLeft:"2px solid rgba(232,88,12,0.35)",padding:"4px 8px",borderRadius:"0 6px 6px 0"}}><span style={{fontSize:9,fontWeight:800,color:C.ac}}>{"CUE"}</span><span style={{fontSize:10,color:C.tm,marginLeft:6}}>{b.cue}</span></div>}
                  {i===0&&ph>=9&&<div style={{marginTop:8,marginLeft:48,animation:"fadeU 0.4s ease"}}>
                    <div style={{display:"inline-flex",alignItems:"center",gap:6,marginBottom:5}}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg><span style={{fontSize:9,fontWeight:700,color:"#60A5FA",textTransform:"uppercase",letterSpacing:0.5}}>{"Videoeksempel \u00b7 NHF \u00d8velsesbanken"}</span></div>
                    <div style={{position:"relative",width:"100%",maxWidth:260,borderRadius:8,overflow:"hidden",border:"1px solid rgba(96,165,250,0.25)",background:"#0a0a0a",cursor:"pointer"}}>
                      <div style={{width:"100%",height:0,paddingBottom:"56%",background:"linear-gradient(135deg,#1a1a2e,#16213e)",position:"relative"}}>
                        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <div style={{width:36,height:36,borderRadius:18,background:"rgba(96,165,250,0.9)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(96,165,250,0.4)"}}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="8 5 20 12 8 19"/></svg>
                          </div>
                        </div>
                        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"6px 8px",background:"linear-gradient(transparent,rgba(0,0,0,0.8))"}}>
                          <div style={{fontSize:10,fontWeight:700,color:"#fff"}}>{"Pasningslek 4v4 \u2014 grunnteknikk"}</div>
                          <div style={{fontSize:9,color:"rgba(255,255,255,0.5)"}}>{"Norges H\u00e5ndballforbund \u00b7 2:14"}</div>
                        </div>
                      </div>
                    </div>
                  </div>}
                  {b.split&&<div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:8,marginLeft:48}}>
                    {b.stations.map(function(st,si){return <span key={si} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"4px 10px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderLeft:"3px solid "+st.col,borderRadius:6,fontSize:11,color:C.tm}}>
                      <span style={{width:6,height:6,borderRadius:3,background:st.col}}/>
                      {st.name}
                    </span>})}
                  </div>}
                </div>;
              })}
            </div>}
          </div>
        </div>
      </div>

      {ph>=6&&<div style={{position:"absolute",bottom:14,right:14,background:"rgba(26,125,66,0.15)",border:"1px solid rgba(74,222,128,0.3)",borderRadius:10,padding:"8px 14px",display:"flex",alignItems:"center",gap:8,animation:"toast 0.4s ease",boxShadow:"0 4px 20px rgba(0,0,0,0.3)"}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.gn} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
        <span style={{fontSize:12,color:C.tx,fontWeight:600}}>{"Lagt til p\u00e5 lagets kalender"}</span>
      </div>}
    </div>
  </div>;
}

/* ── Step 3: Team list ── */
var teamSessions=[
  {week:"Uke 15 \u00b7 7.\u201313. april"},
  {day:"Man",n:"7",time:"17:00",title:"Skudd og avslutning",meta:"60 min \u00b7 Magne",done:true},
  {day:"Ons",n:"9",time:"17:00",title:"Forsvar og samspill",meta:"60 min \u00b7 Andreas",done:true},
  {day:"Tor",n:"10",time:"11:00",title:"Kamp vs. Andeby",meta:"Kamp \u00b7 Susanne",done:true},
  {week:"Uke 16 \u00b7 14.\u201320. april"},
  {day:"Man",n:"14",time:"17:00",title:"Ballkontroll og skudd",meta:"60 min \u00b7 Andreas",done:true},
  {day:"Tir",n:"15",time:"17:00",title:"Forsvar i grupper",meta:"60 min \u00b7 Susanne",done:true},
  {day:"Tor",n:"17",time:"17:00",title:"Torsdags\u00f8kt \u2014 Pasning, Angrep og Forsvar",meta:"60 min \u00b7 Gard",today:true},
  {day:"L\u00f8r",n:"19",time:"10:00",title:"Kamp vs. Nordstrand",meta:"Kamp \u00b7 Andreas",upcoming:true},
  {week:"Uke 17 \u00b7 21.\u201327. april"},
  {day:"Man",n:"21",time:"17:00",title:null,meta:"Ikke planlagt enda",upcoming:true},
  {day:"Tor",n:"24",time:"17:00",title:null,meta:"Ikke planlagt enda",upcoming:true},
];

function Step3(){
  var es=useState(false);var expanded=es[0];var setExpanded=es[1];
  var todayRef=useRef(null);
  var listRef=useRef(null);
  useEffect(function(){
    var t=setTimeout(function(){
      setExpanded(true);
      setTimeout(function(){
        if(todayRef.current&&listRef.current){
          var top=todayRef.current.offsetTop-listRef.current.offsetTop-10;
          var start=listRef.current.scrollTop;
          var diff=top-start;
          var dur=1200;var t0=null;
          function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1);var ease=p<0.5?2*p*p:(4-2*p)*p-1;listRef.current.scrollTop=start+diff*ease;if(p<1)requestAnimationFrame(step)}
          requestAnimationFrame(step);
        }
      },300);
    },1200);
    return function(){clearTimeout(t)};
  },[]);
  return <div style={{maxWidth:680,margin:"0 auto"}}>
    <div style={{textAlign:"center",marginBottom:14}}>
      <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(74,222,128,0.10)",border:"1px solid rgba(74,222,128,0.2)",borderRadius:8,padding:"5px 14px",fontSize:11,fontWeight:800,color:C.gn,letterSpacing:0.5,textTransform:"uppercase",marginBottom:10}}>{"Resultatet"}</div>
      <h3 style={{fontSize:"clamp(20px,3vw,26px)",fontWeight:900,color:C.tx,margin:"0 0 6px",letterSpacing:"-0.3px"}}>{"Hele laget ser planen \u2014 p\u00e5 \u00e9n plass"}</h3>
      <p style={{fontSize:14,color:C.tm,margin:0,lineHeight:1.5}}>{"Alle \u00f8kter samlet. Trykk p\u00e5 en for \u00e5 se detaljer."}</p>
    </div>

    <div style={{position:"relative",background:"#161514",border:"1px solid rgba(255,255,255,0.15)",borderRadius:14,overflow:"hidden",boxShadow:"0 12px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,padding:"9px 14px",background:"linear-gradient(180deg,#2c2b28,#242320)",borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
        <div style={{display:"flex",gap:6,marginRight:6}}>
          <span style={{width:10,height:10,borderRadius:5,background:"#ff5f57"}}/>
          <span style={{width:10,height:10,borderRadius:5,background:"#ffbd2e"}}/>
          <span style={{width:10,height:10,borderRadius:5,background:"#28c840"}}/>
        </div>
        <div style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:6,padding:"4px 10px",display:"flex",alignItems:"center",gap:6}}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          <span style={{fontSize:11,color:"rgba(255,255,255,0.4)",fontFamily:mo}}>{"app.whistl.no/team/u10"}</span>
        </div>
      </div>

      <div style={{background:C.sf}}>
        <div style={{padding:"12px 16px",borderBottom:"1px solid "+C.bd,display:"flex",alignItems:"center",gap:10}}>
          <span style={{display:"inline-flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:14,fontWeight:900,color:C.ac,letterSpacing:"-0.5px"}}>{"whistl"}</span>
          </span>
          <span style={{width:1,height:16,background:C.bd,margin:"0 2px"}}/>
          <div style={{width:26,height:26,borderRadius:"50%",background:"#333",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>{"\ud83c\udfc8"}</div>
          <span style={{fontSize:13,fontWeight:700,color:C.tx}}>{"J2016 - Kolbotn"}</span>
          <span style={{flex:1}}/>
          <span style={{fontSize:10,color:C.td,fontFamily:mo}}>{"april 2025"}</span>
        </div>

        <div ref={listRef} style={{padding:"10px 14px",maxHeight:420,overflowY:"auto"}}>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            {teamSessions.map(function(s,i){
              if(s.week){return <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 4px 2px",marginTop:i>0?4:0}}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.td} strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span style={{fontSize:10,fontWeight:800,color:C.td,textTransform:"uppercase",letterSpacing:0.6}}>{s.week}</span>
                <span style={{flex:1,height:1,background:C.bd}}/>
              </div>}
              var isToday=s.today;
              var past=s.done;
              var isFuture=s.upcoming;
              if(isToday){
                return <div key={i} ref={todayRef}>
                  <div onClick={function(){setExpanded(!expanded)}} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:"rgba(232,88,12,0.08)",border:"1px solid rgba(232,88,12,0.4)",borderRadius:expanded?"10px 10px 0 0":10,cursor:"pointer"}}>
                    <div style={{width:40,height:42,borderRadius:8,background:"rgba(232,88,12,0.2)",border:"1px solid "+C.ac,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <div style={{fontSize:8,fontWeight:800,color:C.ac,textTransform:"uppercase",letterSpacing:0.4,lineHeight:1}}>{s.day}</div>
                      <div style={{fontSize:15,fontWeight:900,color:C.ac,lineHeight:1,marginTop:2}}>{s.n}</div>
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                        <span style={{fontSize:9,fontWeight:800,color:C.ac,letterSpacing:0.5,background:C.al,padding:"1px 7px",borderRadius:8,border:"1px solid rgba(232,88,12,0.3)"}}>{"I DAG"}</span>
                        <span style={{fontSize:10,color:C.td,fontFamily:mo}}>{s.time}</span>
                      </div>
                      <div style={{fontSize:13,fontWeight:700,color:C.tx,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{s.title}</div>
                      <div style={{fontSize:10,color:C.td,marginTop:1}}>{s.meta}</div>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.ac} strokeWidth="2.5" style={{transform:expanded?"rotate(90deg)":"none",transition:"transform 0.2s"}}><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                  {expanded&&<div style={{background:C.ra,border:"1px solid rgba(232,88,12,0.4)",borderTop:"none",borderRadius:"0 0 10px 10px",padding:"12px 14px",animation:"fadeU 0.3s ease"}}>
                    <div style={{height:2,background:"linear-gradient(90deg,"+C.ac+",transparent)",marginBottom:12,opacity:.3}}/>
                    {outBlocks.map(function(b,bi){
                      return <div key={bi} style={{background:C.sf,border:"1px solid "+C.bd,borderLeft:"3px solid "+C.ac,borderRadius:10,marginBottom:6,padding:"10px 12px",animation:"fadeU 0.3s ease "+(bi*0.1)+"s both"}}>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <span style={{fontFamily:mo,fontSize:12,color:C.ac,fontWeight:800,minWidth:38}}>{b.time}</span>
                          <span style={{flex:1,fontSize:13,fontWeight:700,color:C.tx}}>{b.name}</span>
                          {b.split&&<span style={{fontSize:8,background:C.al,color:C.ac,padding:"2px 6px",borderRadius:10,fontWeight:700,letterSpacing:0.5}}>{"STASJONER"}</span>}
                          <span style={{fontFamily:mo,fontSize:10,color:C.td}}>{b.dur}</span>
                        </div>
                        {b.detail&&!b.split&&<p style={{margin:"5px 0 0",fontSize:11,color:C.tm,lineHeight:1.5}}>{b.detail}</p>}
                        {b.cue&&!b.split&&<div style={{marginTop:5,background:C.al,borderLeft:"2px solid rgba(232,88,12,0.4)",padding:"4px 8px",borderRadius:"0 6px 6px 0"}}><span style={{fontSize:9,fontWeight:800,color:C.ac}}>{"CUE"}</span><span style={{fontSize:10,color:C.tm,marginLeft:6}}>{b.cue}</span></div>}
                        {b.split&&<div style={{display:"flex",flexDirection:"column",gap:5,marginTop:8}}>
                          {b.stations.map(function(st,si){return <div key={si} style={{padding:"7px 9px",background:C.ra,borderLeft:"3px solid "+st.col,borderRadius:7}}>
                            <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}><span style={{width:6,height:6,borderRadius:3,background:st.col}}/><span style={{fontSize:9,fontWeight:800,color:st.col}}>{st.label}</span><span style={{fontSize:11,fontWeight:700,color:C.tx}}>{st.name}</span></div>
                            <p style={{margin:"3px 0 0",fontSize:10,color:C.tm,lineHeight:1.45}}>{st.desc}</p>
                          </div>})}
                        </div>}
                      </div>;
                    })}
                  </div>}
                </div>;
              }
              return <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",background:C.ra,border:"1px solid "+C.bd,borderRadius:9,opacity:past?0.6:isFuture?0.75:1}}>
                <div style={{width:36,height:40,borderRadius:7,background:C.sf,border:"1px solid "+C.bd,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <div style={{fontSize:8,fontWeight:800,color:C.td,textTransform:"uppercase",letterSpacing:0.4,lineHeight:1}}>{s.day}</div>
                  <div style={{fontSize:14,fontWeight:900,color:past?C.td:C.tx,lineHeight:1,marginTop:2}}>{s.n}</div>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:700,color:past?C.tm:C.tx,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{s.title||<span style={{color:C.td,fontStyle:"italic"}}>{"Ikke planlagt enda"}</span>}</div>
                  <div style={{fontSize:10,color:C.td,marginTop:2}}>{s.time+" \u00b7 "+s.meta}</div>
                </div>
                {past&&<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.gn} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>}
                {!past&&<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.td} strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>}
              </div>;
            })}
          </div>
        </div>
      </div>
    </div>
  </div>;
}

/* ── Waitlist form ── */
function WaitlistForm(){
  var ns=useState("");var name=ns[0];var setName=ns[1];
  var es=useState("");var email=es[0];var setEmail=es[1];
  var rs=useState("");var role=rs[0];var setRole=rs[1];
  var ss=useState(false);var sent=ss[0];var setSent=ss[1];
  var ls=useState(false);var loading=ls[0];var setLoading=ls[1];
  var errs=useState("");var err=errs[0];var setErr=errs[1];
  function handleSubmit(e){e.preventDefault();if(!email||loading)return;setLoading(true);setErr("");
    fetch("https://formspree.io/f/maqaelpl",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:name,email:email,role:role||"ikke valgt"})})
    .then(function(r){if(r.ok){setSent(true)}else{setErr("Noe gikk galt. Pr\u00f8v igjen.")}setLoading(false)})
    .catch(function(){setErr("Kunne ikke sende. Sjekk internett og pr\u00f8v igjen.");setLoading(false)})}
  if(sent)return <div style={{background:"linear-gradient(135deg,rgba(74,222,128,0.12),rgba(74,222,128,0.03))",border:"1px solid rgba(74,222,128,0.25)",borderRadius:20,padding:"48px 32px",textAlign:"center"}}>
    <div style={{fontSize:36,marginBottom:12}}>{"🎉"}</div>
    <h2 style={{fontSize:24,fontWeight:900,margin:"0 0 8px",color:C.tx}}>{"Du er p\u00e5 listen!"}</h2>
    <p style={{fontSize:15,color:C.tm,margin:0,lineHeight:1.6}}>{"Vi sender deg en invitasjon s\u00e5 fort Whistl er klar. Takk for interessen!"}</p>
  </div>;
  return <div style={{background:"linear-gradient(135deg,rgba(232,88,12,0.12),rgba(232,88,12,0.03))",border:"1px solid rgba(232,88,12,0.2)",borderRadius:20,padding:"40px 28px"}}>
    <h2 style={{fontSize:"clamp(22px,4vw,32px)",fontWeight:900,margin:"0 0 8px"}}>{"Pr\u00f8ve Whistl?"}</h2>
    <p style={{fontSize:15,color:C.tm,margin:"0 0 24px",lineHeight:1.5}}>{"Whistl er snart klar. Meld deg p\u00e5 ventelisten \u2014"}</p>
    <form onSubmit={handleSubmit} style={{maxWidth:400,margin:"0 auto",display:"flex",flexDirection:"column",gap:10}}>
      <input value={name} onChange={function(e){setName(e.target.value)}} placeholder="Navn" style={{background:C.ra,border:"1px solid "+C.bd,borderRadius:10,padding:"12px 14px",fontSize:14,color:C.tx,outline:"none",fontFamily:fn}}/>
      <input value={email} onChange={function(e){setEmail(e.target.value)}} type="email" required placeholder="E-post *" style={{background:C.ra,border:"1px solid "+C.bd,borderRadius:10,padding:"12px 14px",fontSize:14,color:C.tx,outline:"none",fontFamily:fn}}/>
      <select value={role} onChange={function(e){setRole(e.target.value)}} style={{background:C.ra,border:"1px solid "+C.bd,borderRadius:10,padding:"12px 14px",fontSize:14,color:role?C.tx:C.td,outline:"none",fontFamily:fn,appearance:"none",WebkitAppearance:"none"}}>
        <option value="" disabled>Rolle (valgfritt)</option>
        <option value="trener">Trener</option>
        <option value="lagleder">Lagleder</option>
        <option value="forelder">Forelder</option>
        <option value="annet">Annet</option>
      </select>
      <button type="submit" disabled={loading} style={{background:loading?"#666":"linear-gradient(135deg,#E8580C,#F06B1F)",border:"none",borderRadius:10,padding:"14px 24px",fontSize:16,fontWeight:700,color:"#fff",cursor:loading?"wait":"pointer",boxShadow:loading?"none":"0 4px 20px rgba(232,88,12,0.35)",marginTop:4,fontFamily:fn,opacity:loading?0.7:1,transition:"opacity 0.2s"}}>{loading?"Sender...":"Meld meg p\u00e5 ventelisten"}</button>
      {err&&<p style={{fontSize:13,color:C.rd,margin:"4px 0 0",fontWeight:600}}>{err}</p>}
    </form>
    <p style={{fontSize:11,color:C.td,marginTop:12}}>{"Ingen spam. Vi sender kun invitasjonen."}</p>
  </div>;
}

/* ── Data ── */
var outBlocks=[
  {time:"17:00",name:"Oppvarming",dur:"10 min",split:false,detail:"Pasningslek 4v4 i lag. F\u00f8rst uten armer, s\u00e5 med.",cue:"Fokus p\u00e5 bevegelse og kommunikasjon"},
  {time:"17:10",name:"Kast til trener",dur:"5 min",split:false,detail:"Spillerne kaster til trener i tur og orden.",cue:"H\u00f8y albue! Se etter grep og utsving."},
  {time:"17:15",name:"Stasjoner",dur:"40 min",split:true,stations:[
    {name:"Angrep 2v1 (Magnus + Anders)",col:C.rd,label:"Red",desc:"V-h-finte, g\u00e5 selv eller spille videre. Med keeper.",cue:"Oppmuntre til \u00e5 lese forsvaret"},
    {name:"Forsvar (Camilla)",col:C.grn,label:"Green",desc:"Sideforskyvning og 1-mot-1 forsvar.",cue:"Lav tyngde, aktive f\u00f8tter"},
    {name:"Hinderl\u00f8ype (Gard)",col:C.pk,label:"Pink",desc:"Koordinasjon og hurtighet gjennom banen.",cue:"Fullt tempo!"},
  ]},
  {time:"17:55",name:"Avslutning",dur:"5 min",split:false,detail:"Samling, oppsummering og high fives.",cue:""},
];
var sessions=[
  {day:"Man",n:"14",time:"17:00",title:"Ballkontroll og skudd",meta:"60 min \u00b7 Andreas"},
  {day:"Tir",n:"15",time:"17:00",title:"Forsvar i grupper",meta:"60 min \u00b7 Susanne"},
  {day:"Tor",n:"17",time:"17:00",today:true},
  {day:"L\u00f8r",n:"19",time:"10:00",title:"Kamp vs. Nordstrand",meta:"Kamp \u00b7 Andreas"},
];
var feats=[
  {i:"\u26a1",t:"Bare skriv \u2014 s\u00e5 funker det",d:"Skriv \u00f8kten som en vanlig melding. AI-en strukturerer alt.",col:C.ac},
  {i:"\ud83c\udfaf",t:"Stasjoner p\u00e5 plass automatisk",d:"Nevn hva hver gruppe skal gj\u00f8re. Byttetid og coach cues legges til.",col:C.violet},
  {i:"\u270f\ufe0f",t:"Juster rett i planen",d:"Endre titler, beskrivelser og cues direkte i forh\u00e5ndsvisningen.",col:C.teal},
  {i:"\ud83d\ude80",t:"\u00c9n knapp \u2014 ferdig delt",d:"Eksporter som HTML eller kopier rett til e-post eller WhatsApp.",col:C.amber},
  {i:"\ud83d\udc65",t:"Lag og lagoppsett",d:"Importer fra Hoopit eller legg til manuelt. Bland og del inn i lag.",col:C.pk},
  {i:"\ud83d\udcf1",t:"Funker p\u00e5 alt",d:"Ser bra ut p\u00e5 mobil, nettbrett og PC.",col:C.blue},
];
var stepInfo=[
  {label:"Problemet",sub:"Gruppechatten",bl:"Planen forsvinner i st\u00f8yen.",col:C.rd},
  {label:"L\u00f8sningen",sub:"Whistl AI",bl:"\u00d8kten blir strukturert p\u00e5 sekunder.",col:C.ac},
  {label:"Resultatet",sub:"Laget ser det",bl:"Alle ser samme plan, med en gang.",col:C.gn},
  {label:"Verkt\u00f8yet",sub:"Alt du trenger",bl:"Import, redigering og deling samlet.",col:C.violet},
];

/* ── Main ── */
export default function Landing(){
  var ss=useState(0);var step=ss[0];var setStep=ss[1];
  var touchRef=useRef(null);
  function prev(){setStep(function(p){return p>0?p-1:3})}
  function next(){setStep(function(p){return p<3?p+1:0})}
  useEffect(function(){
    var el=touchRef.current;if(!el)return;
    var x0=null;
    function onStart(e){x0=e.touches[0].clientX}
    function onEnd(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>40){dx<0?next():prev()}}
    el.addEventListener("touchstart",onStart,{passive:true});
    el.addEventListener("touchend",onEnd,{passive:true});
    return function(){el.removeEventListener("touchstart",onStart);el.removeEventListener("touchend",onEnd)};
  },[]);

  return <div style={{minHeight:"100vh",background:C.bg,color:C.tx,fontFamily:fn,overflowX:"hidden"}}>
    <style>{"*{box-sizing:border-box;margin:0}body{margin:0;background:#1C1B18}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}@keyframes dot{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}@keyframes fadeU{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@keyframes slideD{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}@keyframes pulse{0%,100%{box-shadow:0 0 0 3px rgba(232,88,12,0.25);transform:scale(1)}50%{box-shadow:0 0 0 10px rgba(232,88,12,0);transform:scale(1.02)}}@keyframes beam{from{transform:translateX(-100%);opacity:0}20%{opacity:1}80%{opacity:1}to{transform:translateX(260%);opacity:0}}@keyframes toast{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.cta-btn:hover{transform:translateY(-1px)!important;box-shadow:0 6px 28px rgba(232,88,12,0.45)!important}.step-tab:hover{border-color:rgba(255,255,255,0.12)!important;background:rgba(255,255,255,0.04)!important}.step-arrow:hover{opacity:1!important;background:#3a3935!important}@media(max-width:720px){.s2split{flex-direction:column!important}.s2chat{flex:1 1 auto!important;border-right:none!important;border-bottom:1px solid rgba(255,255,255,0.08)!important;min-height:280px!important}.s2plan{min-height:260px!important}.step-arrow{display:none!important}.step-tabs{grid-template-columns:1fr!important}.step-tab{min-height:auto!important;padding:13px 0 12px!important}.step-tab-copy{display:none!important}}"}</style>

    {/* Compact hero + steps */}
    <div style={{maxWidth:900,margin:"0 auto",padding:"48px 24px 0",textAlign:"center"}}>
      <FI><div style={{display:"inline-flex",alignItems:"center",gap:6,background:C.sf,border:"1px solid "+C.bd,borderRadius:24,padding:"6px 16px 6px 12px",marginBottom:20}}><span style={{fontSize:15,fontWeight:900,color:C.ac,letterSpacing:"-0.5px"}}>{"whistl"}</span><span style={{width:1,height:12,background:C.bd}}/><span style={{fontSize:11,color:C.td,fontWeight:600}}>{"for trenere"}</span></div></FI>
      <FI delay={80}><h1 style={{fontSize:"clamp(28px,5.5vw,48px)",fontWeight:900,lineHeight:1.08,letterSpacing:"-1.2px",margin:"0 0 14px"}}>{"Fra rotete chatmelding til"}<br/><span style={{background:"linear-gradient(135deg,#E8580C,#F06B1F)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{"ferdig treningsplan."}</span></h1></FI>
      <FI delay={160}><p style={{fontSize:"clamp(15px,2.2vw,18px)",color:C.tm,lineHeight:1.6,maxWidth:500,margin:"0 auto 24px"}}>{" Ikke la treningsplanen drukne i gruppechatten. Beskriv \u00f8kten. Whistl strukturerer. Laget f\u00e5r planen."}</p></FI>
    </div>

    <div style={{textAlign:"center",marginBottom:12}}>
      <FI delay={200}><a href="#waitlist" className="cta-btn" style={{display:"inline-flex",alignItems:"center",gap:10,background:"linear-gradient(135deg,#E8580C,#F06B1F)",borderRadius:10,padding:"13px 28px",color:"#fff",fontSize:15,fontWeight:700,textDecoration:"none",boxShadow:"0 4px 24px rgba(232,88,12,0.3)",transition:"transform 0.15s,box-shadow 0.15s"}}>
        {"F\u00e5 Whistl til ditt lag"}
        <RocketLaunchRoundedIcon style={{fontSize:18}} />
      </a>
      <p style={{fontSize:12,color:C.td,marginTop:10,letterSpacing:"0.2px"}}>{" "}</p></FI>
    </div>

    <div style={{maxWidth:900,margin:"0 auto",padding:"0 24px 80px"}}>
      <FI delay={200}><div className="step-tabs" style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:14,marginBottom:28}}>
        {stepInfo.map(function(s,i){var a=i===step;return <button key={i} className="step-tab" onClick={function(){setStep(i)}} style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"flex-start",gap:5,padding:"14px 0 13px",borderRadius:0,background:"transparent",border:"none",borderTop:"1px solid "+(a?s.col:C.bd),cursor:"pointer",transition:"border-color 0.2s ease, background 0.2s ease",outline:"none",textAlign:"left",minHeight:98}}>
          <span style={{display:"inline-flex",alignItems:"baseline",gap:10,width:"100%",position:"relative",zIndex:1}}>
            <span style={{fontFamily:mo,fontSize:11,fontWeight:700,color:a?s.col:C.td,letterSpacing:0.4}}>{("0"+(i+1)).slice(-2)}</span>
            <span style={{display:"flex",flexDirection:"column",gap:4,minWidth:0}}>
              <span style={{fontSize:10,fontWeight:800,color:C.td,textTransform:"uppercase",letterSpacing:0.75}}>{s.label}</span>
              <span style={{fontSize:16,fontWeight:a?900:700,color:a?C.tx:"rgba(232,228,222,0.82)",letterSpacing:"-0.28px",lineHeight:1.15}}>{s.sub}</span>
            </span>
          </span>
          <span className="step-tab-copy" style={{paddingLeft:21,fontSize:11,color:"rgba(232,228,222,0.46)",lineHeight:1.45,maxWidth:180}}>{s.bl}</span>
        </button>})}
      </div></FI>

      <FI delay={300}><div ref={touchRef} style={{minHeight:440,position:"relative"}}>
        <button className="step-arrow" onClick={prev} aria-label="Previous step" style={{position:"absolute",left:-20,top:"50%",transform:"translateY(-50%)",zIndex:20,width:36,height:36,borderRadius:18,background:C.sf,border:"1px solid "+C.bd,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:0.7,transition:"opacity 0.2s"}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.tx} strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button className="step-arrow" onClick={next} aria-label="Next step" style={{position:"absolute",right:-20,top:"50%",transform:"translateY(-50%)",zIndex:20,width:36,height:36,borderRadius:18,background:C.sf,border:"1px solid "+C.bd,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:0.7,transition:"opacity 0.2s"}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.tx} strokeWidth="2.5" strokeLinecap="round"><polyline points="9 6 15 12 9 18"/></svg>
        </button>
        {step===0&&<Step1/>}
        {step===1&&<Step2/>}
        {step===2&&<Step3/>}

        {/* Step 4: Feature montage */}
        {step===3&&<div style={{maxWidth:660,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:20}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,background:C.violetAl,border:"1px solid rgba(167,139,250,0.25)",borderRadius:8,padding:"5px 14px",fontSize:11,fontWeight:800,color:C.violet,letterSpacing:0.5,textTransform:"uppercase",marginBottom:10}}>{"Verkt\u00f8yet"}</div>
            <h3 style={{fontSize:"clamp(20px,3vw,26px)",fontWeight:900,color:C.tx,margin:"0 0 6px",letterSpacing:"-0.3px"}}>{"Alt du trenger \u2014 ingenting du ikke trenger"}</h3>
            <p style={{fontSize:14,color:C.tm,margin:0,lineHeight:1.5}}>{"Bygget for trenere som vil planlegge raskt og dele enkelt."}</p>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:10}}>
            {[
              {icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.violet} strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,t:"Hoopit-import",d:"Importer spillerlister rett fra Hoopit. Lag oppdateres automatisk.",col:C.violet},
              {icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,t:"Lag og lagoppsett",d:"Del inn i lag automatisk eller manuelt. Bland og shuffle med \u00e9n knapp.",col:C.teal},
              {icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.ac} strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,t:"Rediger rett i planen",d:"Juster titler, cues og stasjoner direkte i forh\u00e5ndsvisningen. Ingen ekstra steg.",col:C.ac},
              {icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.amber} strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,t:"Delt kalender",d:"\u00d8ktene havner p\u00e5 lagets kalender. Alle trenerne ser hva som er planlagt.",col:C.amber},
              {icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.pk} strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,t:"Eksporter som HTML",d:"Last ned \u00f8ktplanen som en ren HTML-fil. Send p\u00e5 e-post, WhatsApp eller skriv ut.",col:C.pk},
              {icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,t:"Funker overalt",d:"Desktop, nettbrett og mobil. Responsivt design som tilpasser seg skjermen.",col:C.blue},
            ].map(function(f,i){return <FI key={i} delay={i*80} style={{background:C.sf,border:"1px solid "+C.bd,borderRadius:12,padding:"18px 16px",display:"flex",flexDirection:"column",gap:10}}>
              <div style={{width:36,height:36,borderRadius:10,background:f.col+"14",border:"1px solid "+f.col+"30",display:"flex",alignItems:"center",justifyContent:"center"}}>{f.icon}</div>
              <div style={{fontSize:14,fontWeight:800,color:C.tx}}>{f.t}</div>
              <div style={{fontSize:12,color:C.tm,lineHeight:1.5}}>{f.d}</div>
            </FI>})}
          </div>
        </div>}
      </div></FI>

    </div>

    {/* Comparison */}
    <div style={{maxWidth:900,margin:"0 auto",padding:"0 24px 80px"}}>
      <FI delay={200}><div style={{background:C.sf,border:"1px solid "+C.bd,borderRadius:16,padding:"32px 28px",maxWidth:700,margin:"0 auto"}}>
        <h2 style={{fontSize:"clamp(20px,3vw,24px)",fontWeight:900,margin:"0 0 8px",textAlign:"center",letterSpacing:"-0.5px"}}>{"N\u00e5r trenerne er forberedt, blir \u00f8kten bedre"}</h2>
        <p style={{fontSize:13,color:C.td,textAlign:"center",margin:"0 0 20px"}}>{"Det handler ikke om \u00e5 planlegge mer \u2014 det handler om at planen n\u00e5r frem."}</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 40px 1fr",gap:0,alignItems:"center"}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,color:C.rd,textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>Uten Whistl</div>
            {["Planen forsvinner i chatten","Medtrenere skummer og glemmer","Rotete tekst ingen orker lese","Ny trener vet ingenting","Alle sp\u00f8r: \u00abhva kj\u00f8rer vi?\u00bb"].map(function(t,i){return <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,fontSize:13,color:C.td,marginBottom:8}}><span style={{color:C.rd}}>{"\u2717"}</span><span>{t}</span></div>})}
            <div style={{marginTop:12,padding:"8px 12px",background:"rgba(201,59,44,0.08)",borderRadius:8,fontSize:12,color:C.rd,fontFamily:mo,textAlign:"center"}}>{"~15 min ekstra per \u00f8kt"}</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}><div style={{width:1,height:40,background:C.bd}}/><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.ac} strokeWidth="2"><polyline points="9,18 15,12 9,6"/></svg><div style={{width:1,height:40,background:C.bd}}/></div>
          <div>
            <div style={{fontSize:11,fontWeight:700,color:C.ac,textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>Med Whistl</div>
            {["Lim inn meldingen \u2014 f\u00e5 en plan","Ryddig format alle forst\u00e5r","Tider, cues og stasjoner p\u00e5 plass","Lett for nye \u00e5 sette seg inn","Alle vet hva de skal gj\u00f8re"].map(function(t,i){return <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,fontSize:13,color:C.tm,marginBottom:8}}><span style={{color:C.gn}}>{"\u2713"}</span><span>{t}</span></div>})}
            <div style={{marginTop:12,padding:"8px 12px",background:C.al,borderRadius:8,fontSize:12,color:C.ac,fontFamily:mo,textAlign:"center",fontWeight:700}}>{"Under 2 min per \u00f8kt"}</div>
          </div>
        </div>
      </div></FI>
    </div>

    {/* Features */}
    <div style={{maxWidth:900,margin:"0 auto",padding:"0 24px 80px"}}>
      <FI delay={200}><div style={{textAlign:"center",marginBottom:36}}>
        <h2 style={{fontSize:"clamp(22px,4vw,30px)",fontWeight:900,letterSpacing:"-0.5px"}}>{"Laget for trenerhverdagen"}</h2>
        <p style={{fontSize:15,color:C.td,marginTop:8}}>{"Ikke enda en app \u00e5 l\u00e6re seg. Bare skriv \u2014 s\u00e5 ordner resten seg."}</p>
      </div></FI>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:12}}>
        {feats.map(function(f,idx){return <FI key={idx} delay={300+idx*80}><div style={{background:C.sf,border:"1px solid "+C.bd,borderLeft:"3px solid "+f.col,borderRadius:14,padding:"24px 20px",height:"100%"}}>
          <div style={{fontSize:28,marginBottom:12}}>{f.i}</div>
          <h3 style={{fontSize:16,fontWeight:800,margin:"0 0 8px",color:C.tx}}>{f.t}</h3>
          <p style={{fontSize:13,color:C.tm,lineHeight:1.6,margin:0}}>{f.d}</p>
        </div></FI>})}
      </div>
    </div>

    {/* Quote */}
    <div style={{maxWidth:900,margin:"0 auto",padding:"0 24px 80px"}}>
      <FI delay={200}><div style={{textAlign:"center",maxWidth:600,margin:"0 auto"}}>
        <div style={{fontSize:56,color:C.ac,lineHeight:1,marginBottom:4,opacity:0.4}}>{"\u201c"}</div>
        <p style={{fontSize:18,color:C.tm,lineHeight:1.7,fontStyle:"italic",margin:"0 0 16px"}}>{"F\u00f8r skrev jeg en lang melding i trenergruppa som folk scrollet forbi. N\u00e5 limer jeg inn det samme i Whistl, og to sekunder senere har jeg en oversiktlig plan med tider, stasjoner og cues."}</p>
        <div style={{fontSize:13,color:C.td}}>Trener, Oslo</div>
      </div></FI>
    </div>

    {/* Waitlist */}
    <div id="waitlist" style={{maxWidth:900,margin:"0 auto",padding:"0 24px 100px",textAlign:"center"}}>
      <FI delay={200}><WaitlistForm/></FI>
    </div>

    <div style={{borderTop:"1px solid "+C.bd,padding:"32px 24px",textAlign:"center"}}><span style={{fontSize:14,fontWeight:900,color:C.td,letterSpacing:"-0.5px"}}>{"whistl"}</span><span style={{fontSize:12,color:C.td}}>{" \u00b7 Laget av trenere, for trenere."}</span></div>
  </div>;
}