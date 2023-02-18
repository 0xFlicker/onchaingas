// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Compiler.sol";
import "./OnChainCheckRenderer_v2_interface.sol";
import "./GasLibs.sol";

contract OnchainCheckRendererV2AnimationUrl is IOnChainCheckRenderer_v2_Render, Ownable {
  IDataChunkCompiler private compiler;
  address[9] private threeAddresses;
  string private rpc;

  constructor(
    address _compiler,
    address chunk1,
    address chunk2,
    address chunk3,
    address chunk4,
    address chunk5,
    address chunk6,
    address chunk7,
    address chunk8,
    address chunk9
  ) {
    compiler = IDataChunkCompiler(_compiler);
    threeAddresses[0] = chunk1;
    threeAddresses[1] = chunk2;
    threeAddresses[2] = chunk3;
    threeAddresses[3] = chunk4;
    threeAddresses[4] = chunk5;
    threeAddresses[5] = chunk6;
    threeAddresses[6] = chunk7;
    threeAddresses[7] = chunk8;
    threeAddresses[8] = chunk9;
  }

  function setRpc(string memory _rpc) public onlyOwner {
    rpc = _rpc;
  }

  function render(
    uint256 tokenId,
    uint256 /* seed */,
    uint24 gasPrice,
    bool /* isDarkMode */,
    bool[80] memory /* isCheckRendered */
  ) public view returns (string memory) {
    string memory tokenIdStr = GasLibs.uint2str(tokenId);
    string memory gasPriceGweiStr = GasLibs.gasPriceToStr(gasPrice);
    string memory threejs = compiler.compile9(
      threeAddresses[0],
      threeAddresses[1],
      threeAddresses[2],
      threeAddresses[3],
      threeAddresses[4],
      threeAddresses[5],
      threeAddresses[6],
      threeAddresses[7],
      threeAddresses[8]
    );
    return
      string.concat(
        compiler.HTML_HEAD(),
        string.concat(
          compiler.BEGIN_SCRIPT_DATA_COMPRESSED(),
          threejs,
          compiler.END_SCRIPT_DATA_COMPRESSED(),
          compiler.BEGIN_SCRIPT(),
          compiler.SCRIPT_VAR("tokenId", tokenIdStr, true),
          compiler.SCRIPT_VAR("gasPrice", gasPriceGweiStr, true),
          compiler.SCRIPT_VAR("mintGasPrice", gasPriceGweiStr, true),
          compiler.SCRIPT_VAR(
            "rpc",
            string.concat("%2522", rpc, "%2522"),
            true
          ),
          compiler.END_SCRIPT()
        ),
        "%253Cstyle%253E%250A%2520%2520*%2520%257B%250A%2520%2520%2520%2520margin%253A%25200%253B%250A%2520%2520%2520%2520padding%253A%25200%253B%250A%2520%2520%257D%250A%2520%2520canvas%2520%257B%250A%2520%2520%2520%2520width%253A%2520100%2525%253B%250A%2520%2520%2520%2520height%253A%2520100%2525%253B%250A%2520%2520%257D%250A%253C%252Fstyle%253E%250A%253Cscript%253E%250A%2520%2520%2522use%2520strict%2522%253Bwindow.onload%253D()%253D%253E%257Blet%2520m%252Ca%253Ddocument.body%252Cr%253DgasPrice%252Cu%253D!1%253Bconst%2520L%253Dnew%2520THREE.Color(16731456)%252Cz%253Dnew%2520THREE.Color(1965840)%252CA%253D()%253D%253E%257Bconst%2520t%253DmintGasPrice%252B100%252Co%253Dnew%2520THREE.Color(1940464)%253Breturn%2520gasPrice%253EmintGasPrice%253Fo.lerp(L%252C(gasPrice-mintGasPrice)%252F(t-mintGasPrice))%253AgasPrice%253CmintGasPrice%253Fo.lerp(z%252C1-gasPrice%252FmintGasPrice)%253Ao%257D%252CB%253Dt%253D%253E%2560%253C%253Fxml%2520version%253D%25221.0%2522%2520encoding%253D%2522UTF-8%2522%253F%253E%250A%253Csvg%2520version%253D%25221.1%2522%2520viewBox%253D%25220%25200%252024%252024%2522%2520xmlns%253D%2522http%253A%252F%252Fwww.w3.org%252F2000%252Fsvg%2522%253E%250A%253Cg%2520fill%253D%2522%2524%257Bt%257D%2522%253E%250A%253Cpath%2520d%253D%2522M22.25%252012c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33%25202.19c-1.4-.46-2.91-.2-3.92.81s-1.26%25202.52-.8%25203.91c-1.31.67-2.2%25201.91-2.2%25203.34s.89%25202.67%25202.2%25203.34c-.46%25201.39-.21%25202.9.8%25203.91s2.52%25201.26%25203.91.81c.67%25201.31%25201.91%25202.19%25203.34%25202.19s2.68-.88%25203.34-2.19c1.39.45%25202.9.2%25203.91-.81s1.27-2.52.81-3.91c1.31-.67%25202.19-1.91%25202.19-3.34zm-11.71%25204.2L6.8%252012.46l1.41-1.42%25202.26%25202.26%25204.8-5.23%25201.47%25201.36-6.2%25206.77z%2522%2520fill%253D%2522%25231d9bf0%2522%252F%253E%250A%253C%252Fg%253E%250A%253C%252Fsvg%253E%2560%252CO%253Dt%253D%253E%257Bconst%2520o%253Dnew%2520THREE.TextureLoader().load(%2560data%253Aimage%252Fsvg%252Bxml%252C%2524%257BencodeURIComponent(t)%257D%2560)%252CS%253Dnew%2520THREE.MeshBasicMaterial(%257Btransparent%253A!0%252Copacity%253A.65%252Ccolor%253A16777147%252Cblending%253ATHREE.AdditiveBlending%252Cmap%253Ao%257D)%252Ce%253Dnew%2520THREE.PlaneGeometry(128%252C128)%253Breturn%257Btexture%253Ao%252Cmaterial%253AS%252Cgeometry%253Ae%257D%257D%252Cg%253Ddocument.createElement(%2522input%2522)%253Bg.type%253D%2522checkbox%2522%252Cg.id%253D%2522liveCheckbox%2522%253Bconst%2520d%253Ddocument.createElement(%2522label%2522)%253Bd.htmlFor%253D%2522liveCheckbox%2522%252Cd.innerText%253D%2522Live%2520update%2522%253Bconst%2520c%253Ddocument.createElement(%2522span%2522)%253Bc.style.position%253D%2522absolute%2522%252Cc.style.bottom%253D%252210%2522%252Cc.style.left%253D%252210%2522%252Cd.style.color%253D%2522white%2522%252Cd.style.marginLeft%253D%252210px%2522%252Cc.appendChild(g)%252Cc.appendChild(d)%252Ca.appendChild(c)%252Cg.addEventListener(%2522change%2522%252Ct%253D%253E%257Bu%253Dt.target.checked%252Cu%2526%2526(x%253D0)%257D)%253Bconst%2520f%253Ddocument.createElement(%2522div%2522)%253Bf.style%253D%2522position%253A%2520absolute%253B%2520top%253A%252010%253B%2520right%253A%252010%253B%2520color%253A%2520white%2522%252Cf.innerText%253D%2560Gas%2520price%253A%2520%2524%257BgasPrice%257D%2520gwei%2560%252Ca.appendChild(f)%253Bconst%2520l%253Dt%253D%253E(t!%253D%253Dvoid%25200%2526%2526(m%253Dt%25252147483647)%253C%253D0%2526%2526(m%252B%253D2147483646)%252C((m%253D16807*m%25252147483647)-1)%252F2147483646)%253Bl(tokenId)%253Bconst%257Bwidth%253AC%252Cheight%253Ay%257D%253Da.getBoundingClientRect()%253Blet%2520M%253Dy%252F2%252Ci%253Dy*2%252CR%253D0%253Bconst%2520s%253Dnew%2520THREE.PerspectiveCamera(80%252CC%252Fy%252C1%252C3e3)%253Bs.position.z%253D1500%253Bfunction%2520j(t)%257Bt.isPrimary%2526%2526(R%253Dt.clientY-M)%257Dconst%2520n%253Dnew%2520THREE.Scene%253Bn.background%253Dnew%2520THREE.Color(0)%253Bconst%2520I%253Dnew%2520THREE.HemisphereLight(16777147%252C526368%252C1)%253Bn.add(I)%253Bconst%2520w%253Dnew%2520THREE.PointLight(16777147%252C1%252C1e3%252C0)%253Bw.position.set(0%252C0%252C150)%252Cw.lookAt(0%252C0%252C0)%252Cn.add(w)%253Bconst%2520h%253Dnew%2520THREE.WebGLRenderer(%257Bantialias%253A!0%257D)%253Bh.setPixelRatio(window.devicePixelRatio)%252Ch.setSize(C%252Cy)%253Bconst%2520T%253Dnew%2520THREE.CylinderGeometry(50%252C100%252Ci%252C32%252C1%252C!0)%253BT.translate(0%252Ci%252F2%252C0)%253Bconst%2520%2524%253Dnew%2520THREE.MeshPhongMaterial(%257Bcolor%253AMath.ceil(16777215*l())%252Cside%253ATHREE.DoubleSide%252CflatShading%253A!0%257D)%252Cv%253Dnew%2520THREE.Mesh(T%252C%2524)%253Bv.position.set(0%252Ci%252F2%252C0)%252Cn.add(v)%253Blet%2520p%253D%255B%255D%253Bconst%2520P%253DO(B(%2522%25231d9bf0%2522))%253Bfunction%2520b()%257Bconst%2520t%253DDate.now()%252Co%253Dnew%2520THREE.Mesh(P.geometry%252CP.material)%253Bo.delay%253DMath.floor(5e3*Math.random())%252Bt%252Co.position.set(10-30*Math.random()%252C2e5%252C10-30*Math.random())%252Cp.push(o)%252Cn.add(o)%257Dfor(let%2520t%253D0%253Bt%253Cr%253Bt%252B%252B)b()%253Bconst%2520D%253D%255B%255D%252CF%253D10%252BMath.ceil(10*l())%252CU%253Dnew%2520THREE.SphereGeometry(2%252C8%252C8)%252CH%253Dnew%2520THREE.MeshBasicMaterial%253BH.color.set(16777215)%253Bfor(let%2520t%253D0%253Bt%253CF%253Bt%252B%252B)%257Bconst%2520o%253Dnew%2520THREE.Mesh(U%252CH)%253Bo.position.set(1e3-2e3*l()%252C1e3-2e3*l()%252C1e3-2e3*l())%252CD.push(o)%252Cn.add(o)%257Dfunction%2520G()%257Bconst%257Bwidth%253At%252Cheight%253Ao%257D%253Da.getBoundingClientRect()%253BM%253Do%252F2%252Ci%253Do*2%252Cs.aspect%253Dt%252Fo%252Cs.updateProjectionMatrix()%252Ch.setSize(t%252Co)%252Cv.position.set(0%252Ci%252F2%252C0)%257Da.appendChild(h.domElement)%252Ca.style.touchAction%253D%2522none%2522%252Ca.addEventListener(%2522pointermove%2522%252Cj)%252Cwindow.addEventListener(%2522resize%2522%252CG)%252CG()%253Blet%2520x%253D240%253Bfunction%2520k()%257Bif(requestAnimationFrame(k)%252CP.material.color%253DA()%252Cu%2526%2526x--%253C0%2526%2526(x%253D240%252Cfetch(rpc%252C%257Bmethod%253A%2522POST%2522%252Cbody%253AJSON.stringify(%257Bjsonrpc%253A%25222.0%2522%252Cmethod%253A%2522eth_gasPrice%2522%252Cparams%253A%255B%255D%252Cid%253A1%257D)%257D).then(async%2520e%253D%253E%257Bconst%257Bresult%253AE%257D%253Dawait%2520e.json()%253BgasPrice%253DparseInt(E%252C16)%252F1e9%257D))%252CgasPrice!%253D%253Dr)%257Bif(gasPrice%253Er)for(let%2520e%253D0%253Be%253CgasPrice-r%253Be%252B%252B)b()%253Belse%257Blet%2520e%253Dr-gasPrice%253Bfor(const%2520E%2520of%2520p)if(E.done%257C%257C(E.done%253D!0%252Ce--)%252Ce%253C%253D0)break%257Dr%253DgasPrice%252Cf.innerText%253D%2560Gas%2520price%253A%2520%2524%257BgasPrice%257D%2520gwei%2560%257Ds.position.y%252B%253D.05*(200-R-s.position.y)%252Cn.rotation.y-%253D.005%252Cs.lookAt(n.position)%252Ch.render(n%252Cs)%253Bconst%2520t%253DDate.now()%252Co%253D.001*t%252CS%253DMath.sin(o)%253Bfor(const%2520e%2520of%2520p)%257Bif(e.lookAt(s.position)%252Ce.delay)if(t%253Ee.delay)e.delay%253Dnull%252Ce.position.y%253Di%252F2%252B50%252B20*Math.random()%253Belse%2520continue%253Be.velocity%253De.velocity%257C%257Cnew%2520THREE.Vector3(0%252C-1%252C0)%252Ce.velocity.y-%253D.267%252Ce.position.add(e.velocity)%252Ce.position.y%253C-i%252F2%2526%2526(e.bounceCount%253Fe.bounceCount%253C3%253F(e.bounceCount%252B%252B%252Ce.velocity.y%253D-e.velocity.y*.2%252Ce.position.y%253D-i%252F2)%253Ae.done%253F(p.splice(p.indexOf(e)%252C1)%252Cn.remove(e))%253A(e.position.set(10-20*Math.random()%252C2e6%252C10-20*Math.random())%252Ce.bounceCount%253D0%252Ce.velocity.x%253D0%252Ce.velocity.y%253D-1%252Ce.velocity.z%253D0%252Ce.delay%253DMath.floor(5e3*Math.random())%252Bt)%253A(e.bounceCount%253D1%252Ce.velocity.x%253D8-16*Math.random()%252Ce.velocity.z%253D8-16*Math.random()%252Ce.velocity.y%253D-e.velocity.y*.2%252Ce.position.y%253D-i%252F2))%257D%257Dk()%257D%253B%250A%250A%253C%252Fscript%253E"
      );
  }
}
