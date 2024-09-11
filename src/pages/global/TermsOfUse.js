import "./TermsOfUse.css"

function TermsOfUse() {
    return (
        <body className="terms-of-use">
            <div id="terms-of-use">
                <h1 className="terms-of-use-h1">쉘위펫즈 이용약관</h1>

                <h2 className="terms-of-use-h2">제 1 장 총칙</h2>

                <h3 className="terms-of-use-h3">제 1 조 (목적)</h3>
                <p className="terms-of-use-p">본 약관은 쉘위펫즈(이하 “회사”라 합니다)가 운영하는 웹사이트 ‘쉘위펫즈’ (www.shallwepets.com) (이하 “웹사이트”라 합니다)에서 제공하는 반려동물과 함께 있을 수 있는 공간을 추천하는 온라인 서비스(이하 “서비스”라 한다)를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>

                <h3 className="terms-of-use-h3">제 2 조 (용어의 정의)</h3>
                <p className="terms-of-use-p">본 약관에서 사용하는 용어는 다음과 같이 정의합니다.</p>
                <ul className="terms-of-use-ul">
                    <li className="terms-of-use-li">“웹사이트”란 회사가 반려동물과 함께 있을 수 있는 공간을 추천하기 위해 컴퓨터 등 정보통신설비를 이용하여 서비스를 제공하는 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.</li>
                    <li className="terms-of-use-li">“이용자”란 “웹사이트”에 접속하여 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
                    <li className="terms-of-use-li">“회원”이라 함은 “웹사이트”에 개인정보를 제공하여 회원등록을 한 자로서, “웹사이트”의 정보를 지속적으로 제공받으며, “웹사이트”이 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.</li>
                    <li className="terms-of-use-li">“비회원”이라 함은 회원에 가입하지 않고, “웹사이트”이 제공하는 서비스를 이용하는 자를 말합니다.</li>
                    <li className="terms-of-use-li">“ID”라 함은 이용자가 회원가입 시 등록한 사용자 “개인이용문자”를 말합니다.</li>
                    <li className="terms-of-use-li">“서비스”라 함은 반려동물과 함께 있을 수 있는 공간을 추천하고 관련 정보를 제공하는 서비스를 말합니다.</li>
                </ul>

                <h3 className="terms-of-use-h3">제 3 조 (약관의 공시 및 효력과 변경)</h3>
                <p className="terms-of-use-p">본 약관은 회원가입 화면에 게시하여 공시하며, 회사는 사정변경 및 영업상 중요한 사유가 있을 경우 약관을 변경할 수 있으며 변경된 약관은 공지사항을 통해 공시합니다.</p>
                <p className="terms-of-use-p">본 약관 및 차후 회사사정에 따라 변경된 약관은 이용자에게 공시함으로써 효력을 발생합니다.</p>

                <h3 className="terms-of-use-h3">제 4 조 (약관 외 준칙)</h3>
                <p className="terms-of-use-p">본 약관에 명시되지 않은 사항이 전기통신기본법, 전기통신사업법, 정보통신촉진법, ‘전자상거래등에서의 소비자 보호에 관한 법률’, ‘약관의 규제에 관한 법률’, ‘전자거래기본법’, ‘전자서명법’, ‘정보통신망 이용촉진 및 정보보호 등에 관한 법률’, ‘소비자보호법’ 등 기타 관계 법령에 규정되어 있을 경우에는 그 규정을 따릅니다.</p>

                <h2 className="terms-of-use-h2">제 2 장 이용계약</h2>

                <h3 className="terms-of-use-h3">제 5 조 (이용신청)</h3>
                <p className="terms-of-use-p">이용신청자가 회원가입 안내에서 본 약관과 개인정보보호정책에 동의하고 등록절차(회사의 소정 양식의 가입 신청서 작성)를 거쳐 ‘확인’ 버튼을 누르면 이용신청을 할 수 있습니다.</p>
                <p className="terms-of-use-p">이용신청자는 반드시 실명과 실제 정보를 사용해야 하며, 1개의 생년월일에 대하여 1건의 이용신청을 할 수 있습니다.</p>
                <p className="terms-of-use-p">실명이나 실제 정보를 입력하지 않은 이용자는 법적인 보호를 받을 수 없으며, 서비스 이용에 제한을 받을 수 있습니다.</p>

                <h3 className="terms-of-use-h3">제 6 조 (이용신청의 승낙)</h3>
                <p className="terms-of-use-p">회사는 제5조에 따른 이용신청자에 대하여 제2항 및 제3항의 경우를 예외로 하여 서비스 이용을 승낙합니다.</p>
                <p className="terms-of-use-p">회사는 아래 사항에 해당하는 경우에 그 제한사유가 해소될 때까지 승낙을 유보할 수 있습니다.</p>
                <ul className="terms-of-use-ul">
                    <li className="terms-of-use-li">서비스 관련 설비에 여유가 없는 경우</li>
                    <li className="terms-of-use-li">기술상 지장이 있는 경우</li>
                    <li className="terms-of-use-li">기타 회사 사정상 필요하다고 인정되는 경우</li>
                </ul>
                <p className="terms-of-use-p">회사는 아래 사항에 해당하는 경우에 승낙을 하지 않을 수 있습니다.</p>
                <ul className="terms-of-use-ul">
                    <li className="terms-of-use-li">다른 사람의 명의를 사용하여 신청한 경우</li>
                    <li className="terms-of-use-li">이용자 정보를 허위로 기재하여 신청한 경우</li>
                    <li className="terms-of-use-li">사회의 안녕질서 또는 미풍양속을 저해할 목적으로 신청한 경우</li>
                    <li className="terms-of-use-li">기타 회사가 정한 이용신청 요건이 미비한 경우</li>
                </ul>

                <h2 className="terms-of-use-h2">제 3 장 계약 당사자의 의무</h2>

                <h3 className="terms-of-use-h3">제 7 조 (회사의 의무)</h3>
                <p className="terms-of-use-p">회사는 웹사이트를 안정적이고 지속적으로 운영할 의무가 있습니다.</p>
                <p className="terms-of-use-p">회사는 이용자로부터 제기되는 의견이나 불만이 정당하다고 인정될 경우에는 즉시 처리해야 합니다. 단, 즉시 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 공지사항 또는 전자우편을 통해 통보해야 합니다.</p>
                <p className="terms-of-use-p">제1항의 경우 수사상의 목적으로 관계기관 및 정보통신윤리위원회의 요청이 있거나 영장 제시가 있는 경우, 기타 관계 법령에 의한 경우는 예외로 합니다.</p>

                <h3 className="terms-of-use-h3">제 8 조 (이용자의 의무)</h3>
                <p className="terms-of-use-p">이용자는 본 약관 및 회사의 공지사항, 웹사이트 이용안내 등을 숙지하고 준수해야 하며 기타 회사의 업무에 방해되는 행위를 해서는 안됩니다.</p>
                <p className="terms-of-use-p">이용자는 회사의 사전 승인 없이 본 웹사이트를 이용해 어떠한 영리행위도 할 수 없습니다.</p>
                <p className="terms-of-use-p">이용자는 본 웹사이트를 통해 얻는 정보를 회사의 사전 승낙 없이 복사, 복제, 변경, 번역, 출판, 방송 및 기타 방법으로 사용하거나 이를 타인에게 제공할 수 없습니다.</p>

                <h2 className="terms-of-use-h2">제 4 장 서비스의 제공 및 이용</h2>

                <h3 className="terms-of-use-h3">제 9 조 (서비스 이용)</h3>
                <p className="terms-of-use-p">이용자는 본 약관의 규정된 사항을 준수하여 웹사이트를 이용합니다.</p>
                <p className="terms-of-use-p">본 약관에 명시되지 않은 서비스 이용에 관한 사항은 회사가 정해 ‘공지사항’에 게시하거나 별도로 공지하는 내용에 따릅니다.</p>

                <h3 className="terms-of-use-h3">제 10 조 (정보의 제공)</h3>
                <p className="terms-of-use-p">회사는 회원이 서비스 이용 중 필요하다고 인정되는 다양한 정보에 대하여 전자메일이나 서신우편 등의 방법으로 회원에게 정보를 제공할 수 있습니다.</p>

                <h3 className="terms-of-use-h3">제 11 조 (광고 게재)</h3>
                <p className="terms-of-use-p">회사는 서비스의 운용과 관련하여 서비스 화면, 홈페이지, 전자우편 등에 광고 등을 게재할 수 있습니다.</p>
                <p className="terms-of-use-p">이용자는 광고주와의 상관 관계로 인해 발생한 손해에 대해 회사가 책임지지 않는다는 점을 이해하고 동의해야 합니다.</p>

                <h3 className="terms-of-use-h3">제 12 조 (서비스의 중단)</h3>
                <p className="terms-of-use-p">회사는 정기점검, 시스템의 점검, 교체, 고장 등으로 인해 서비스 제공이 일시적으로 중단될 수 있습니다. 이 경우, 회사는 사전에 공지사항을 통해 알려야 합니다.</p>
                <p className="terms-of-use-p">천재지변 또는 기타 불가항력적인 사유로 인한 서비스 제공의 일시 중단에 대해 회사는 책임지지 않습니다.</p>

                <h3 className="terms-of-use-h3">제 13 조 (정보의 제공 및 광고의 게재)</h3>
                <p className="terms-of-use-p">회사는 이용자에게 서비스 제공과 관련하여 유용한 정보를 제공하거나 광고를 게재할 수 있습니다.</p>

                <h3 className="terms-of-use-h3">제 14 조 (서비스의 이용제한)</h3>
                <p className="terms-of-use-p">회사는 다음과 같은 사유로 인해 서비스를 이용 제한할 수 있습니다.</p>
                <ul className="terms-of-use-ul">
                    <li className="terms-of-use-li">타인의 명예를 훼손하거나 악성 소프트웨어를 배포하는 경우</li>
                    <li className="terms-of-use-li">기타 회사가 제공하는 서비스의 목적에 맞지 않거나 이용자의 행동이 사회적 통념에 벗어나는 경우</li>
                </ul>

                {/* <h2 className="terms-of-use-h2">제 5 장 재화의 주문 및 결제 관련</h2>

                <h3 className="terms-of-use-h3">제 16 조 (결제방법)</h3>
                <p className="terms-of-use-p">회원은 회사에서 제공하는 서비스를 이용하기 위해 다양한 결제 수단(예: 신용카드, 직불카드 등)을 이용하여 결제할 수 있습니다. 이때 회사는 이용자의 지급방법에 대해 추가적인 수수료를 징수하지 않습니다.</p>
                <p className="terms-of-use-p">회사는 이용자의 결제 요청에 대해 수신확인 통지를 합니다. 주문 확인에 대한 내용은 해당 게시판에서 확인할 수 있습니다.</p>
                <p className="terms-of-use-p">수신확인 통지를 받은 이용자는 의사표시의 불일치 등이 있는 경우, 수신확인 통지를 받은 후 즉시 구매신청 변경 및 취소를 요청할 수 있으며, 회사는 배송 전 이용자의 요청이 있는 경우 지체 없이 처리합니다. 단, 이미 대금을 지불한 경우에는 제18조의 ‘반품규정’을 따릅니다.</p>

                <h3 className="terms-of-use-h3">제 17 조 (배송정책)</h3>
                <p className="terms-of-use-p">회사는 이용자와 서비스 제공 시기에 관하여 별도의 약정이 없는 이상, 이용자가 결제한 날부터 7일 이내에 서비스를 제공하도록 조치를 취합니다.</p>
                <p className="terms-of-use-p">회사는 이용자가 구매한 서비스에 대해 제공 시기 및 기타 사항을 웹 페이지 하단에 명시합니다. 만약 회사가 약정된 기간을 초과한 경우에는 그로 인한 이용자의 손해를 배상합니다. 단, 회사의 고의 또는 과실이 없음을 입증한 경우에는 배상하지 않습니다.</p>

                <h3 className="terms-of-use-h3">제 18 조 (취소 및 반품 환불 규정)</h3>
                <p className="terms-of-use-p">회사는 이용자가 구매 신청한 서비스가 제공 불가할 경우에는 지체 없이 그 사유를 이용자에게 통지하고, 사전에 대금을 받은 경우에는 대금을 받은 날부터 3영업일 이내에 환급하거나 환급에 필요한 조치를 취합니다.</p>
                <p className="terms-of-use-p">서비스가 제공되기 전 이용자가 결제를 취소할 경우, 회사는 해당 주문건을 취소 처리하고 카드 결제 승인을 취소합니다.</p>
                <p className="terms-of-use-p">서비스 제공 후 결제 취소는 불가합니다. 단, 회사의 부주의로 인한 서비스의 문제 발생 시, 회사는 이용자에게 환불 및 교환 조치를 취합니다.</p> */}

                <h2 className="terms-of-use-h2">제 5 장 기타</h2>

                <h3 className="terms-of-use-h3">제 15 조 (면책 및 손해배상)</h3>
                <p className="terms-of-use-p">천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 회사의 서비스 제공 책임이 면제됩니다.</p>
                <p className="terms-of-use-p">회사는 이용자간 또는 이용자와 제3자간의 상호 거래 관계에서 발생하는 결과에 대해 책임을 지지 않습니다.</p>
                <p className="terms-of-use-p">회사는 이용자가 게시판에 게재한 정보, 자료, 내용 등에 관하여 정확성, 신뢰도에 대해 책임을 지지 않으며, 이용자는 본인의 책임 하에 본 웹사이트를 이용해야 합니다.</p>
                <p className="terms-of-use-p">이용자가 게시 또는 전송한 자료 등에 관하여 손해가 발생하거나 무료로 제공되는 서비스 이용과 관련하여 불이익이 발생하더라도 이에 대한 모든 책임은 이용자에게 있습니다.</p>
                <p className="terms-of-use-p">ID와 비밀번호의 관리 및 이용자의 부주의로 인한 손해 또는 제3자에 의한 부정 사용에 대한 책임은 이용자에게 있습니다.</p>
                <p className="terms-of-use-p">이용자가 본 약관을 위반하여 회사에 손해를 발생시킨 경우, 이 약관을 위반한 이용자는 회사에 발생한 모든 손해를 배상해야 하며, 동 손해로부터 회사를 면책시켜야 합니다.</p>

                <h3 className="terms-of-use-h3">제 16 조 (개인신용정보 제공 및 활용에 대한 동의서)</h3>
                <p className="terms-of-use-p">회사가 회원 가입과 관련해 취득한 개인 신용 정보는 신용정보의 이용 및 보호에 관한 법률 제23조의 규정에 따라 타인에게 제공 및 활용 시 이용자의 동의를 얻어야 합니다. 이용자의 동의는 회사가 회원으로 가입한 이용자의 신용정보를 신용정보기관, 신용정보업자 및 기타 이용자 등에게 제공해 이용자의 신용을 판단하기 위한 자료로서 활용하거나 공공기관에서 정책자료로 활용하는 데 동의하는 것으로 간주합니다.</p>

                <h3 className="terms-of-use-h3">제 17 조 (분쟁의 해결)</h3>
                <p className="terms-of-use-p">회사는 이용자와의 분쟁이 발생할 경우 원만한 해결을 위해 필요한 모든 노력을 해야 하며, 소송이 제기될 경우에는 회사의 본사 소재지를 관할하는 법원이 관할 법원으로 합니다.</p>

                <br/>
                <p className="terms-of-use-p" style={{paddingLeft: 0}}><strong>부칙</strong></p>
                <p className="terms-of-use-p">본 약관은 2024년 9월 1일부터 적용됩니다.</p>
            </div>
        </body>
    );
}

export default TermsOfUse;