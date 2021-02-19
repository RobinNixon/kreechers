// Kreechers (c) 2021 Robin Nixon

let PRESETS = [
[0,2,3,0,1,0,0,1,0,0,2,0,0,0,1,1,1,0,2,1,0,0,2,0,1,0,1,1,640,320,''],
[1,0,0,1,0,0,0,0,0,1,1,0,1,0,0,0,0,1,1,1,1,0,640,320,''],
[2,102,1,517,234,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǈ11ĂǿȁȀǽȅƨȂć2ȄĉȈȆȎƑȍĂȊĂ6ȋ05ȖȉșȏȜƇȑĐȓęȟȝȤŮȑȡČȑȘĚȨȃȥȯŬȫćȣȒțĔȲȰȹũȕȵ0ȼĄȭȿĀȸėȭĊȴȺɉłɈĞɆħɎɊɑĿɐȢȖɄğɂɒɚťɌ0ɔɛɠźȴɁɖȶĥɝɡɩĠɨĒɬĈɟģɰāɮɪɵɧȖɲăȪɦɶɽūɗɺɼɞʂıəɴɾʈĖəȓəāɤĂʀĻɹʉʔĈʇɅʄİɻʕʜȠʙĔʛŀʓʝȤʗɷɯʟĮəʑʦʤǶʣĞɣȖʫʩĳʰʮȎʑāʍĘʭȽŀʺʸȯʷēȧʵ0ʡɓˇ˂ǷˉĦˁˈʂ˄ˌ˔ě˓đʋȀʼʃȔɥ˕˟Ģʴėʾē˗ˠ˧đ˦ă˪ċˎ˨˯ĖˤħɝˬĴ˛Ą˲˰ǎ˹ğʲ˝ʐˋ˺̂ă˷Ć˼̆́ʿŗ̅̃Ǘ̌ĢˆĎˮ̍̔ĆːĨː˴̜̉̕Ĥ˙Ⱦȶʏā̗̝˰Ȃ̏ĕ̇Ď˵ŋ̪̥ǜ̬ʖ˞š̱̯ƴ̮̌ě̚řȴ̶̤ǌ̵ɭ̡ʳ̳Š́̿Ƽː̨đ˹͇Ľ͈͋ǃɮ͎̈̊˭̝͑̓ͅģ̙˒̛͙ˠ͔ą̟˛̢Ƀ͟͠ʤˢ˱ͨʞŢ̹ͩƥʗ̱͢ɳ͘ŞɰͰͱƗ͹ͭĤ̻š̾ͻƱʬ;ĝ˾ʻͷŝ͵΃Ɲɰ͐ĀͺΑͨΌ΍ȅȂʑΐ·ɸˇ͛ŧΚΖƟɐ΂Ĥ͝ʨΡʝȼΤĦͤ̓˿̣ΆΨ˃Ȗ̧α͕ĥΕβǹΘζ̫ν˸ΊŨΒκƍͦąσͬΧτʕΫιȌήΉ̀ϋʕʷ͊οΓĔώŖψϓŹΪ˚ʟϚ̑čΞŦ̌Ϛϝųȫͽϒ̘ʂ΀ϩɪȓύϗͣΜ̠ąφΫϱȤϫʂ̩ͫϵȚɢЂϼƊʹЅˑϭŸϨІŽϜĚϰЎʔА˅ϐĀЀГɒ͋Κσ͍ЉŘЕКŮϖĬϣȩρųЍУũɰϻġΦЃЬϝέϹ̈́ЋƀТгšȴεɫР˫рϛЗлƱЫĄΠţΣтхŞ˛̸ьĪкŏчэřЯ˜єёōјіűʗХŒѓˊўƆ͓ћķɐѣĵѝѥūȼȼѪЩŗѭŐѕѮŔɄ̾ѷĴʷѫīɄѿѸŎȓɝЙŭѼɏѨ҃Ŗʷ҉ĻщŊѵҌѯȀȑ҂ƤҏҔŏμȮŹҘϮқżφґŤʓҠĘѲҢůҝшȀғƷʑҚҫłыƉʆҋϙҹҴŋϟ͗ƉҳҼЇδϠ͖ҨŐϥӂƭҭĉҰűӁӊƇφʎзͶŷ҇Ϙӑƭ̾ː҅һ҄ӟӚӀϡӄƃӎĴӇӢĳҾ̌ӧůӐ˖ӡӪĲϾċφɮөƐӮӳńϳʟӝӅǁͥӲӼįӵĊȭʾҸԅ̂ӻӔҞԌ˔ӷνӹĸ͋ԕπԑŭԀЊĖӰԚǛΚԉЉȫԘłҥ̺ӕԠѴˇԎĉԟŶȭԮԫĺҎԪԝϏċȫԨƘ԰ԴĴԜԼԏӖԿȝͳӥĐԋĄԥȀԾńӇԦՅՀϵʏԲԄŊՎՒōԢԷσѱ՗ŀ̽ՠ՚őΫԜՑŧҏՂդľѧԐƘիĝԳլńճմɚѰҖ͞ίәԹƾձշĶɄЮջրցȝӞӶՈďՊȞգևŜԳԣƃϬ֐ŲȼȂΈИ֋ˣ֏Ōնҿ֖ѶʂէΆՙň֧֢ŊԃկĜՌ֪ȺҾθ֞̋ЉֆְѤϑՄվӍԁָɵʌ֦֜Ʀըֿľ֍ϒȂ֩Ű׋׆ĽՕѳЏִ׎ű՟החטդ˹ׅЄיŘϧדמɠַƔפעקךסרǴ˗ל׫ׯװƔ׮Ÿ׳ױģПư׍׶ğҧз֠Ǝ׿׻ņɐ׺؂Ǚɮ؁؆Ǩ֚Ƽצ؊ĹҶֻԸӋת؏į؅ЌؕؖħМؚ؛ǥ؉Ƌ׵؟̐֜זƬأؤĩؑƮ؎تĸоΰжدɉؘشǜֺ֯սطȹجؼɒԻʟةŴكؿĕ֕ƫ،نќպ˿ׁϸƯءًĪؾƬخٓЦ֤؞٘̀օٛҟȶٜٗĬΙ׃ƫ٢٣ԩξْؓҷב٩յٰٟƽرČُɇٲςٹٰ˗٥َٻŚʗ٨ٳȷ̉։زՋڀťڃڄҩ̉ҲфڍǷٷƴمڒđ΅ơٵڗĶσڇĀҪͼʟڌڜвě٭ƂڨڥĲڔկڤŲضًѫԜڈƙږٳڞٍԈڊګٮس֮ڼڽƐԕڭȳہгڷƚڡΥۇŤڛ؋ջϤȶۉžڪڿƜВǜ֙ͨϴ֡ȇںĆɐگȗˇۣҦٚǣˬ͢ڱŬքؗԭۍő۬ƞۦďӎ۔՛ӤԆ۱э۵љهϯۓۼˀ՗ʷ۾ś۸ƠӸ۠ӴӡوŜͰ۳ָՎҏ؉܉ۂį܇Č۷چϿ̉Чؓīн܃ܘĢЈĈܚۤ۞֭ʁؓʾܒġܗĻɝܲǢۖĨӓڠΔۥڣق܌ǍɰܰƌܵٶܤĈ֠ܩɀ݆ƅܷц݋̖Ά׵֓Įܣ˘ݏռŽ݂Ǯܧۆχт̾ȴۣݚۘ݉͘ƢڂۼݍۿݞʘݘՃ̞ܾŁͰ݄ڬϷ̥ܕݗ̴νݣĸݪƩݦĩܜ˩ܞݖܳ܂ǩݼǫݜĆހ׏ڊݴŌݕ͙ݾŝ؝ǝމƊ܋œޘ݃־ΛưސŔʓޜćނŰޒļޤԍݹĒދݬԙۧľ؉ލĿ޴ܨެōۋŖݪ܏Ō޶˥޸ĺޡȤݸ׷߁٘ɮ޿ی֝ރ޷͌ݶػƚ߃ԠޮҮ٤ݱް͕ȑߊߏհ߇ǻޔɱԷݯߍŌӁߓţߨŇިşުą݈ߟĮ߮ݺƕڭ߳ĒަĶݓߩ՗ߛү߱Śߡԛࠀ֊ݭݝߙĠݠ١ࠄࠈܦڑŔߪƝيŝ޼܁ࠆ֛ۗř֬ĮࠂҊǬ߷ȬӡࠝуƛӌŐߜмࠌ۶ݑܝߎՉࠪ٫ࠍђ٦ҍ޸ࠑň࠷ࠡࠗ϶ƒࠣܠśֲӠԽ࠰ĐࠣŶۛϊ̄ؕࠨġࠠƚࡆߺࡄ۲ۨʅӿۇʗࠦҜࡒҐ࡛Ċ߹ƌ͋֩߾ݫŕࠠ࠹ņࡌݵ࠻࠲ܡƄ࠾ߐиŒࡁࠧ࡝ƥࠕ̲şܑ߽ˇ׺ࡺǬࡧڎߗ߆ߵޞ؃ࠋ̒߿҃࡟čΏܟࡰԕ߬ŏڙؒĺӻࡎؽׂ࠮Īࠊޯߚ࠴ڻޛ܌݂̱ࡳǨࡩıࡐĝܹࡤď܆ܽҿكΫՑкࢗ࡭ȅࢵ߰ࡪԵࢅީΝࢾܪŉࠓƏࢀėࢋʶ࢟˳އ࠯޲࣊࠘۾Ӈࢸࡵذ࣒ڦҺࡸ࡬ۀܫغߢࢡؓࢵĊࢥŅࢧǒࡷࠇ܀ݮܺάߘĿɝࢩωęࣟƙࣣĬ߅Ư݁ࢼӽࢇےࣀ࠸ࣺȜࣆࠅćґࣳ࢑Ŏ࢓ߑ٪ę࢖޸ࣳࡀࣔԯ࢙ंएँ࣬ࡼࢢۇࢤࢉŉӘȏ࣮Ŕޖ֟Љ߉ࢎࣜǴࣄࢌओųۏऐِӱĠѾࢿञߝƦࣱԺࠬџ࣍ʒڏह٢҆܎ٹݨƘբŢߕܭࣘ΋ٹјڟࢬࠚचňऍ͆ήधֽࣴࠖŏॐࡉĎࢲࢿ࣠Ԕݻऩʯࠢт॓ľڭࣂֳࣕ࠼ࣻलĐ।Ƶऀࢠऒळࣩ࢔Ɗڐ߯ٛऋކभƹ८ॴࣧॲҀ࣫ܬȮࡣņڹ࠱ؐΆ࣡ĵʓक़Ū̟ॵٌࣝࣛߤͮߦϵعकथĹ६ǡ࣑Ġএİȓ۳र࢈ࣼĸवŭঢژषѩࣈܐম॔߂िխॠ߫ঃࡥऑηॆаহ࠘܈खࠅॾċঌړরݴ়ࣥࣖকॿ्࠙ࠈӜݗࡾǮ؎ݼࣵ֎यۺব२ীШনȎӭݩলউ४֌ষখई৅ٯͧįͰॺ঴ॼǊ޽ࡑ࡫ࡊ࠽ࠏߥबঘė৆ࣉख़Ǎঞशƪࡈԙٕয়ڵ݇ढࢯ७тӁۮƵ̪ৗ২Ņ؄ॎࢪۺ׼Љদ५ٛপैࣅ৤ҡ࣯Ƅݡ͇ۨजډ৮ބīਟƛӎਓ৶঄ৄࣻ݊ߍپԞਙϦਗʧǇोīѐ঄ē৊࢝সॳਲЖࡱʽड़ĉַ৔̶Ε৘пۯঔ͂৐৻ࠞߖਝ͈֠॰੘০ধߤࡘΆҁहĺ਩ĕਂৰǼͰձ͢׊঻੠ਣ࢞ߝҗࡰঢ়ࢃਹ੡৞͖য৽਼ʱॖǃ঑৪ʪ࢙јל،ࠛޭࡔ੼ঁԹअߌਉॱছࠎজ੗ˌԟޚčࢹઔ৚ઘĜࢵਜয়؉ਂƠڌӇј׈ખਗ਼сੂތ੤࠴ܴࣾॸĝড়ਈٔ਎ਔȦࠄੰੈ৪кХАޣࣸ˗ࢍƒ৾ʠݥ઻թৈঋંࢶͮઈੱे৥ઋģԗޏ࠰੏࠺৩۩઺ટং׹࠰ۢऱݟૌ֗ઍࠉԤ̉ફ࢚݅Ďऄ੦Ɓ৯य़ગǥ৴৺БՍ૔৷҈૚߭૏ৠďઑǨۖ੮઀ࣚ૩৫सଌ਍૷ࢁݛۼਮżफॕૡસҿદЁƹਫ਼͜૭রŧଅ৵Ńाଗɛ݂ા੺ࣦયŜضଛׇଉčࣳષƏੁ঒૒तଫো޾ଓॣੌ૰ਤિ૑Ԓਛॢ੹ݤઠۡҹ૥ধରǷ੝ଠଭ੸্ܫ߻ƞ੪૶ʕଈޟॅࣨˏিୄЊআŅА୤੽ତĕૉଵǫଡ଼૓॥ߣৎগŋੑ଀બő਴ƨঠɘ૨޹ୀٸଃ୾ǔ઩୒ସণଡځਢ୥঵Œ୏ǀପঀ଼અڧୡ୬ଜनӗ୽Ԃૐ਒ଲּৌஒૺ૗ן৹ؒஎૻэ୵ࢂƈૃ୍࡛ΟசŲ୑ޅஆ਀૾১Ũ޺ଳ৬Ĳ૵઼૟ଢ଼૽ୟƋॷ଻řଔઌǩ୮଺Ɠਅܭਇܫߡणੇ֢ை֣س֠ਏ୆םȝપஈ௜ஷવਨ஼ıଦſ୹Ƨஐ஠੅வŞ१बਸ஑ǎ஖ƹӾ௔௉ବইௌୃଏઓੋ੻ୁ׻੒˽܅ߟˬ௯୊ش௞୓ୋఁୖ௟௭ܛલٹ੨څܥ୨ૺભށࠖʾ௎ࣞ਺Ħ஝ఀணܘ஧௹ৎత৥ਪ୕చݝଣ૊੊ஶॽறࢄĲ૙ग़ֶఠਚఉࣰఴС஥Ǽଞડ઴੢ܼਡਲ਼ૐబ৭Ĝ௴؀ాƓ୞঒ુބ஭ࠅ఩ઞభǞ్ǃ੄૕஘୕ЫషగъେմਦϽஊऔੲČ૲௬ɡ౛Ƽ౑઎Э౏۴௤ǹదॏ਌ౣߴٰ௨ّ౩ŪయǺुγୃಃŚ௖Ʋ౰ǁౝঽ۹౼ӏ౥ܱ౵ǟ౿Ʈూ఍એఀୗ͙ଖɩ౲৲ħ࢜૕ఞಌǉ঎ಕƙ౹૖ీ౪ʈಬǖ୻ĞಧǑಊƽಙଧஓ͈ಗ௵ூ౒૧ଊಢ಑௄஌஡୳ೃಷೄঊ஫ೋىঙಁ੟ౙ଎ϓಟǤۙடࣛಡವʈ೘ǚఞࡅূدਐটܻ೎ೊſ೜೎؍ಪΖಽƂޚ೯೫ۊ೭ೳƂ೪೶೹਄౉೺ǧࣷǑೲդಱƖ೨լഅ೽Ǝˎ೸௧ెഈ͖ഇഎƑഃଶ೵Ӫഐ഑й૳ഘǭഗி஀ഛաകĦૄഠܶഢҫ଴ധĤ஺೹ഁഥՅ௓യലǪഋളǥമʚചശŃഝ߲ޞഽګഓŕൂլസѦಮ౼ീ֔പІ࡙ŎവՏൌϼࡦ൒उഘૉࢆࡃലൊکൕ಼૦œെࡕഠൔߞഠ൘౺഻ࡇ୚Ǫൢκயત൞൪ওఽ൳ǋङ஁ǥ൐Гࢴߟ൮൶૞ధࡸൄࢶ൜࠳ؤ࣐ߟ඄ޑ൲κ൨଱඀Ż૜୭ඍ˨൰ଚ݆౧එѢν੫ಐƗൻі൸඄కඛļറ଄ૠदඕ׬௛ਵ൱Ŋൿގה௦હশ૱ඬ஗ăඋԴඏ͏ඹ૝મ඲Ƕ੣೔઒଑ඦକൈમܸౄԹ඄සٓ୙ශ࣓ೃ਑වǇ୧ඁࣇ੿൹ොढ़ƪ઄ୢͱ۳ൽĻ඼෉੔ද඘ऺǅඡǝ߃ඉභبୡݷഢ඾ǰಝಏʤӉගුඔਘඖம෎ඃෘžৢˌඥĳா൵ৱ෯Ա೼ǻఢśඣࡻలǊ෨ƲО౷੓෠௽ࡍఅਊƶณȆϚ௚ଘೂݝਂආ՘઱෇˻ऻશผݔਬබǴਰฆ঱఼ಚર௼Ŭ෸நਾܿĪଷ಻ߒ৓ำଙട੍फ़෿̝ฬඳŒఇ෋ఘ୷௃͕นǧ๙ෳ੩ݗชভ෧൬ฒνଡ଼ĜഁೞೈӨಿো౗ෟ୪ஞแೇƽ෢ל๥੖๪ݽӡปఱ୔Ĺ෦๖ਸ਼Ҕછֹึภ੕ษ๘ುǜનڊܩ඗ɕేୂજϵ೸ෲ຀ǒ।ഁנ฾ୟ૆ีഔෞరਉฏؙଭ̪ๅ෣૯੉˧ඓ෈ौǢฦูǙຏාຊԡ૪ğࢩ຤ޠඝ๢఻Ǩૹ๩௿΍ตຢ෻Ǫଇ๫ຈǲඨఀ຿म଒҃ப෫஀๛ƾಹ˶າ૴ຟ෍ɠ଩໚Ǒเ೓ɑຨฤ௷ǣළพໃຮ౞ʸ๐೏฻๕ຆ໣ຉੜדົ౎๡๎ɽ๶๱ǯේ୲୩Ĕ୫໠Ʀ໽ฟǗ෥ඪ෩ಾ໎ີ˺۸໸Ŭ෱ೆэෑЪ෷༅Ƣ໥๋໊ƿ෽୸༚ǈ໯ƒ௖ິϋ຺༢໙๼ڝຽனϵ༗ŗ໦Ř༤฀ெ༈ࠒ༰้ޟ໪༎༌ਠທثථ؊༒ਫ๠ౌ༻ܢໜ׆༱ٙ໱ກ฽༷඀๓଍ඌ༬ໆ໋ొ༿୰ງ༸༁ทܘ෯̪෨๟ೡཛഡའపซ༝ಏ๭ཧಔ๹ཎ๦ผ༵רౢຄགଐ཯෭໴མ੃೑ย཈ཻŤປདྷఎພఎྃྊྋྌྍྎྏྐྑྒྒྷྔྕྖྗ྘ྙྚྛྜྜྷྞྟྠྡྡྷྣྤྥྦྦྷྨྩྪྫྫྷྭྮྯྰྱྲླྴྵྶྷྸྐྵྺྻྼ྽྾྿࿀࿁࿂࿃࿄࿅࿆࿇࿈࿉࿊࿋࿌࿍࿎࿏࿐࿑࿒࿓࿔࿕࿖࿗࿘࿙࿚࿛࿜࿝࿞࿟࿠࿡࿢࿣࿤࿥࿦࿧࿨࿩ڍ'],
[0,2,2,0,1,0,0,1,1,1,1,1,1,0,1,1,1,0,0,0,640,320,''],
[1,0,0,0,0,1,0,0,1,0,0,0,1,1,0,1,1,0,1,1,0,0,470,234,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩƺ1Āɬ0ɮɰɭɲɯɳɱɴɷɶɹɵɻɸɼɺɽʀɿɶɪǞʂɾʇʁʈʆʉʌʋʎʈʄǝʏʍʊʕʔʗʓʙɼʑǜʚʘʖʞʡʠʣʜʝʤʢʟʩʨʫʥʦʪʧʰʯʲʨʭǙʬʳʱʷʺʵǚʻʸʿʾʞʼǗˁʹˆˀʱ˃ǖ˅ˈˍˌʃˊǔˏˇ˓ˎˑˋ˔˙˖˛ɿ˗Ǔ˕ˠ˚ʴ˞Ǒˡ˜ˢˇˤ˥˨˧˭ʷ˪ǐ˦˲ˬʋ˰Ǐ˳ˮ˴ʖ˶ǎ˸˾˺ɷ˼Ǎ˿˹̅ː̂Ǌ̄̊ˬ̈ǋ̋̆̀ɮ̍̉̑̐̕ʌ̓ǉ̛̏˩̙Ǉ̜̗ˌ̢̞̟̖̠̣ǅ̨̦̥̌Ǆ̡̪˚̭̮̫̰̗̲ǃ̯̹ʐ̷ǁ̵̺ˣ̼ƿ̾̓ɳ́ǀ̈́̿ʤ̴͈͆͂˂͋ƽ͎͍͊͐Ƽ͉͒ʗ̧͕͖͓͚͘ƹ͗̾͟ɫ̻ͣ͜͡Ʒͦ͝ʛͨͩͥͯ˛ͭͮͫʹ̀ͲƳ̯ͪͷƵ͹Ͱ̇ͻƱͽ͵΀ͼ;Άʿ΄Ʋ΂̠Ή΁·΂΍ư΋·ΑƯΓʹΕƮΗ̏ΙƭΛͰΝƬΟ͘ΡƫΣ̄ΥƪΧ͜ΩƩΫ̵έƨί˸αƧγ̴εƦη̶ιƤλ˦νξΏσʩρƣο̖φƢψ̅ϊơό˕ώƠϐ̀ϒƟϔ˭ϖƞϘ͞ϚƚϜ̬ϞϟτͪϢƛϠͱϦƙϨʾϪϫϤϰ̘ϮƗϬ̱ϳƖϵˍϷϸϱ͗ϻƕϹ˯ϿƓЁ̝ЃƑЅΈЇЈϽЍ́ЋƐЉͶАƌВˉДƎЖʲИЙЎ͈МƍК͏РƊТ͔ФƉЦυШЩОЎЬЭ΃вʓаƈЪдеƆз˻йƅл͙нƄп˵сƃуͧхƀчϲщъЮгͅэюѐє˝ђſыіїŽљͬћżѝʀџќя͢ѣŻѡͿѧŷѩёѫŸѭЏѯѬѥϱѳѰѵєѷѴѕяѻŶѱ̒ѿŴҁ҃Ҁѹͺ҆Ų҅ҊųҌҍűҏҐůҒғŭҕҖūҘҙũқҜŧҞҟťҡҢţҤҥšҧҨşҪҫŝҭҮśҰұřҳҴŗҶҷŕҹҺœҼҽőҿӀŏӂӃōӅӆŋӈӉŉӋӌŇӎӏŅӑӒŃӔӕŁӗӘĿӚӛĽӝӞĻӠӡĹӣӤķӦӧĵөӪĳӬӭıӯӰįӲӳĭӵӶīӸӹĩӻӼħӾӿĥԁԂģԄԅġԇԈğԊԋĝԍԎěԐԑęԓԔėԖԗĕԙԚēԜԝđԟԠďԢԣčԥԦċԨԩĉԫԬćԮԯąԱԲăԴԵāԷԸѽԼѪԻĲԺԸՁԵՃԿՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔՕՖ՗՘ՙ՚՛՜՝՞՟ՠաբգդեզէըթժիլխծկհձղճմյնշոչպջռսվտրցւփքօֆևֈ։֊֋֌֍֎֏֐ְֱֲֳִֵֶַָֹֺֻּֽ֑֖֛֢֣֤֥֦֧֪֚֭֮֒֓֔֕֗֘֙֜֝֞֟֠֡֨֩֫֬֯־ֿ׀ׁׂ׃ׅׄ׆ׇ׈׉׊׋׌׍׎׏אבגדהוזחטיךכלםמןנסעףפץצקרשת׫׬׭׮ׯװױײ׳״׵׶׷׸׹׺׻׼׽׾׿؀؁؂؃؄؅؆؇؈؉؊؋،؍؎؏ؘؙؚؐؑؒؓؔؕؖؗ؛؜؝؞؟ؠءآأؤĚ'],
[1,0,0,0,0,1,0,1,1,1,0,0,1,1,0,1,1,0,0,0,1,0,704,350,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣʤʥʦʧʨʩʪʫʬʭʮʯʰʱʲʳʴʵʶʷʸʹʺʻʼʽʾʿˀˁ˂˃˄˅ˆˇˈĹ1Āˋ0ˍˏˌˑˎ˒ː˓˖˕˘˔˚˗˛˙˜˟˞ˡ˝ˣˠˤˢ˥˨˧˪˦ˬ˩˭˫ˮ˱˰˳˯˵˲˶˴˷˺˹˼˸˾˻˿˽̀̃̂̅́̇̄̈̆̉˨Ȁ̢̡̛̗̖̙̘̜̝̠̟̞̤̥̣̦̩̋̏̊̑̌̐̓̒̔̕̚˶̴̶̸̵̷̨̧̭̯̪̰̮̱̳̲̹̺̼̻̎̽̿́˕̬͈͇͉͍͎͓͂̀̾͊͆͌͋͑͐ͅ͏̛͕͔͖͙͚̈́͒͛ͥͤͧ͜͟͢͞͠͝͡˱ͨͦͣͭͬͯͫ͘ͱͮͲͰͳͶ͵͐ͪͷʹͼͻ;͸ͽ΀Ϳ΁΄΃Ά͇ͺ΂Ί΅΋·ΌΏΎΑ΍ΓΐΈǿΔΒΕΚΙΜΘΞΛΟΝΠȂΡΥΣ΢ΨΦΩΧΪέά̈ΉίΫγήδβεθηκͶαζξιολπσςυρ̌ντχϊόφύϋώϑΑωϒϏϖϕϘϐϚϗϛ̷ϔϝϠϜϢϙϣϡϤϧ̍ΗϨϥϬϫϮϦϰϭϚϟϲϵϯ϶ϱϷϺϹ͠ϴϻϸЀϿЂϼЁЄΰϪІЉЅЋЃЌЊЍ˿ϾЏГЎЕАДЗϥВЖИНМПЙСΜЛТРОХШЧЪ͵ФЫЩЦаЯвЮ̯ЭбдзйгкиˤжлрнтмфгпусхшыъЎчэщёьђѐϳЈѕјєњѓќКїћљѝѠѣѢіǾѡѨѤѩѥѫЬџѬѪѱѰѳѭ΅яѲѵѴѸѻѺ͗ѯѹҀѼҁѽ҃˰ѷ҄҂҉҈ҋ҅˛҇ҍҌҊҐғЩҏҒҗґҙҔќҖҚҘқҠҟϯҝҡҞҦҥҨϒҤҢҧҬҩҭϰҫҰүҴҮҶУѿҷҵҳҺҽϠҲһӁҾӂҼ͈ӀӃӈӅӄӋ̮ӇӊӉӌӏӒ͙ӎӑӖӐӘӓ̫ҹӚӝӗӞәͬӕӡӤӠӦӟ˧ӣӧӥӨӬәӪӭӫӲӱүӰӮӳӷӴҬӶӸӽӺӾҷӼӿԃӹԅѥԂԆԄԀԋѡԈԌԉԐԏѽԎԊԕԑԖЉԔԗԛԒԘЅԚԝԜԞԢңӜԣԡԨԧԍԦԤԩԭԪђԠ԰ԮԴԳεԲԯԹԵԺԷԬԻԿԶԼТԸՀՂՅՇΡՄՁՈՆՋӔԾՎՍՒՌҿՐՓՑՔ՘ΪՊ՗՝ՙ՞̱՜՟գ՚ՠ̣բեդզժѾѧիթհկͽըղլձն˭մոջշս˒պվռյթրփֆւջօֈց֌Ն֊֍֋ևԧ֏֑֒֕Շ֔֗֐֛ԑ֖֚֙֜ӱ֤֞֡֠Ԓ֣֦֪֟ӯՖ֥֮֩֫˖ְִ֨֯ӻֱֵֹ֭քֶָֺ־ցֳ׀׃ֿӅֻׂׅׄѹׇ׉׈׊Ѳ׌׏׎דѫבהג׍ъזיטםыכמלחןֽףעקԆנצס׬дתר׫ױюץװ׵׭ӵ״׷׺ײӉׯ׻׶׼ϼ׾؁؀؅Ҫ׹؄׿؊׆؈؆؉؏Ґ؃؎ؓ؋Չ؍ؘؕؐאؚؗ؝ؔҋؙؒ؟أճ؜ؤ؞آсءبجا΂ثخةحͨذزرسͭصظطؼ̀غؽػضؾئقفنԟلهمـўծيٌُцىًِّ؇َٖٔٙЪؿٕٛٚψٓٞ٣٠πٝ٥٤ٟ҆٢٨٭٪ΐ٧ٯٮ٩Ҏ٬ٲٷٴ;ٱٹٸٳȁٽڀټλٻپځ٠ڄچډؙڈڂڅٹڌڎڑـڐڊڒڋٶڍڕښէژږڞڛеڝڠڣڙЇ٘ڥڟڨؖڧکڭڤعڢڪڲڮڜڬگڷڳ̺ڔڹڼ؝ڻڴۀעڿڸہ־ۃڽۄְۇۅیۊڱۍۈۑͩۏۉےگۋەې֗ۘۖ۝ּׅۜۚۙڶ۞ۢۥڦǽۦۡۧխ۩۪۬۰չ۔ۯ۴ڭ۠۱۫գ۷۵۸֓۳۹۽ڏۿ܁܀٤ۻ܅܈Գ܇܄܌ӷ܋ۼܐՔ܏܉ܑԘܓ܍ܔ֧܃ܕܜڇܛܙܘ؟ܗܝܡӥܣܠܤשܟܥܨھܫܩܭܢܯܱܰ؎ܧܬַܸܴܼۤڠܷܵ݀Ӳܿܽ݁׸ܻܹ݄ڑ݈݃݌Ѽ݋݅ݐӒݏ݉ݍҦݓݕݘћݗݑݙؠܳݝݠիݛݔݜҊݣݡݤѳݧݥݩוݟݬݨշݫݭݰѤݳݱݵפ݇ݹݸجݷݼހҜݯݴބ֐ݿޅށзއݽތԥݻވސاދމޔ׮ރލޑ֎ޗޕޘܖޛޙޠՋޓޡޜЃޣޝޥ؂ޟިޤԴާީެϏޯޭޱٗۮ޴ް؋޳޵޸Ѧ޷޼߀֥޻޹޽޲ޫ߄߁ӽ߃߅߈φߋ߉ߐإޏߑߌۛ߇ߕߔ݆޿ߍߘגߏߜߙѶߗߡߝݒߣߠߨ݂ߧߥߤؑ߫߭ߩ҃ߟٰ߬߱߯ߵߴߦߓ߸߰ܒ߷߹߽ݮ߻ࠀ߼՞߳ࠁࠅϽ߿ࠈࠄԓࠋࠉࠌךࠏࠍࠑԱࠓࠕࠔتࠗࠐࠜࠎࠃ࠘ࠠ׽ࠛ࠙ࠤѕࠇ̸ࠝࠡࠧࠥࠨ͍ࠫࠩ࠰ӛࠟ࠭ࠬޮࠣ࠱࠵و࠳࠹࠴֢࠷࠽ࡀт࠯ࡁ࠸̂ࡃ࠼ࡈ̦ࡇࡅࡄ࠲ߛࡉࡍ࠶࠻ࡌࡐߺࡏࡔࡘܺࡗࡑ࡙Ӧࡋ࡜ࡠ̃࡟ࡕ࡝˞ࡣࡥࡡˍࡧࡩ࡬ϩࡓ࡭ࡨݞ࡯ࡤࡰ࡚Ǽࡱࡸݦ࠿ࡴࡼϲ࡫ࡽࡵ˟ࡿࡹࡕࢃࢁ࠸ࢆࢀࢊ̓ࡻࢄࢎͲࢉ࢏࠵࢑ࢇࡡ࢔ࢋ࡭ࢗ࢒ߔ࢚࢕ࢅࢍ࢛࢞ߒ࡛࢘ࢥҥ࢝ࢦࡑࢨࢢ߹ࢫࢡ࠴ࢮࢩࡈࢱࢬެࢴࢯࠤࢷࢲߤࢺࢵ߄ࢽࢸ߉ࣀࢻࠉࣃࢾޭࣆࣁߩࣉࣄࢭࢠ࣍ࣇ࣑࣌͢ށ࣓࣊ߕ࣐ࣖߜࣙࣔބࣜࣗݽࣟࣚ޽࣢ࣝܬࣥ࣠ޕࣣࣨݨࣦ࣮ࣩ࣫݁ސࣱ࣏࣯࣬ࣕࣵӆࣲࣷࣸաࣹࣻࣽӍࣿँऀڵࢤऄईߎःࣼऌ͑ࣴउ܈एऍࣧऋअखΖࡳऐचߢङओञԙकछगБडटढ٫झणपٍइदमНऒफࣰथलव̔ऱध۞सय۸ऻशܝाहۀु़ܑॄिऑऴूऄेोڳ्ॅ۹ॐैۄ॓ॎ݊ॊ॑ॗॖग़ऺख़॔ढ़ۓऩॗ।كॣॡ॥μय़३ࣇड़ॠی८६܆५२ॵֲॴ९ढॱॶچॻॹڽॾॲُঁॼڨ঄ॿڞইংޒॸঋࣲঊঅپঐঈٲও঎ݾ঍঑ࣸখচॳ१ঔঝٺঙঠ९জতٔদগ؀঩ডطবধٛযপ׭লভز঵রنস঳ױ঻শঘট়ূ۲ুিৃۭࡷ৆৊Ҹ৅হেषণ৏ࢁাৎڗ্৒৕١ৗো৘नभ৙ঢ়Ϟ৑ড়এৣৠऍ৔ৡֱ৩৤؁৬১؏৯৪ׁ০৳ࢪ৵৭ࡱ৲৹ߞ৸ৰࢄ৻৿מਁ৶ֈ਄ৼדਇਂףਊਅ՘਍ਈ֟ਐ਋ێ৛ਔ਑तਖ਎ਈਓਛۺ৾ਞࢼਠਘࢥਝਤ৴ਚਧਪࢂਣਗࢲਦਮކਭਡࣅਲ਼ਫ࠘ਰ਴֘ਸ਼਱਼࢙਺޼ਹ਷ݢਿ੃ࢳ੅਽ࡼੂ੉ݲੈੀࣛ੎੆ਢ਩ੌ੒Τ੖੕ࠪੑਖ਼߽ੋ੏ࡒয়੟৪ਫ਼੘܊ਜ਼੢ީ੤ੜࠆˉ੭੮੯ੰੱੲੳੴੵ੶੷੸੹੺੻੼੽੾੿઀ઁંઃ઄અઆઇઈઉઊઋઌઍ઎એઐઑ઒ઓઔકખગઘઙચછજઝઞટઠડઢણતથદધન઩પફબભમયર઱લળ઴વશષસહ઺઻઼ઽાિીુૂૃૄૅ૆ેૈૉ૊ોૌ્૎૏ૐ૑૒૓૔૕૖૗૘૙૚૛૜૝૞૟ૠૡૢૣ૤૥૦૧૨૩૪૫૬૭૮૯૰૱૲૳૴૵૶૷૸ૹૺૻૼ૽૾૿଀ଁଂଃ଄ଅଆଇଈଉଊଋଌ଍଎ଏଐ଑଒ଓଔକଖଗଘଙଚଛଜଝଞଟଠଡଢଣତଥଦଧନ଩ପଫବଭମଯର଱ଲଳ଴ଵଶଷସହ଺଻଼ଽାିୀୁୂୃୄ୅୆େୈ୉୊ୋୌ୍୎୏୐୑୒୓୔୕ୖୗ୘୙୚୛ଡ଼ଢ଼୞ୟୠୡୢୣ୤୥୦୧୨୩୪୫୬୭୮୯୰ୱ୲୳୴୵୶୷୸୹୺୻୼୽୾୿஀஁ஂஃ஄அஆஇஈஉஊ஋஌஍எஏஐ஑ஒஓஔக஖஗஘ஙச஛ஜ஝ஞட஠஡஢ணத஥஦஧நனப஫஬஭மயரறலளழவஶஷஸஹ஺஻஼஽ாɗ'],
[0,2,2,0,1,1,1,0,0,1,1,1,1,1,1,0,0,1,0,0,640,320,''],
[1,0,0,1,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,240,116,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟĚ1ȠȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘĵ'],
[1,0,0,0,0,1,0,0,0,1,1,0,1,1,0,0,0,0,0,0,1,0,282,140,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂĶ1ĀɅ0ɇɉɆɋɈɌɇɃĿɏĕɒɐļɔēɗɕĹəđɜɚɄĘɞɟĴɢĎɥɣıɧČɪɨĮɬĊɯɭīɱĈɴɲĨɶĆɹɷĥɻĄɾɼĢʀĂʃʁğʅɌʆĳʈɍʊʋɡʎʏėʌʑʐʓʕɩʖʘɮʚʛĬʌʔʞɘʝʢĩʠʥʟʤʨĦʧʫʦʪʮģʭʱʬʰʴĠʳʷʲʶʺĝʹʽʸɎ˂ʍɊ˄ˀˇˈˉˊˋˌˍˎˏːˑ˒˓˔˕˖˗˘˙˚˛˜˝˞˟ˠˡˢˣˤ˥˦˧˨˩˪˫ˬ˭ˮ˯˰˱˲˳˴˵˶˷˸˹˺˻˼˽˾˿̴̵̶̷̸̡̢̧̨̛̖̗̘̙̜̝̞̟̠̣̤̥̦̩̪̫̬̭̮̯̰̱̲̳̹̺̻̼̀́̂̃̄̅̆̇̈̉̊̋̌̍̎̏̐̑̒̓̔̽̾̿̀́͂̓̈́̕̚Ē'],
[0,2,2,0,0,1,1,1,1,1,0,1,1,0,0,0,0,1,1,0,640,320,''],
[2,26,1,517,234,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇį11ǈǌǍŖǊǎǑǒōǐā4ǋǓǙǚĽǕǛǞǟĹǝ0ǗǠǥǦĬǢǧǪǫĥǢǤāǩǬǲǳďǱĂǯǴǹǺĉǮǘĆǸǻȁǴǶȂȅȆǰǾǣȉȄĀȌȇȏǇȎȀĄȎȐȖǂǽĈȀșȗȝǁȕĉȓȞȣƿȜȍȉĊțȨȤȬƯȒȫĎȢȭȳƪȦąȲčȸȴȻƞȠȼȿǀȶȎȾćɄɀɇƊȯĈɆąɌɈɏƄȶĄȪǷȰɅȉȺɐɚƁɎăəĊɝɛɢźɂɖǿȋɦ0ɥɣɬżɊēəɯɭɳŶɒɞɩȩɨɕȚɸɴɾţɡęɟɿʄűɫɗĚɔʈʅʌşɲɍɽĔɱʑʍʕŏɶɻȈʙĞʊĀʃʖʠņʁʞʔʜʥʡʨŅʇČʝģʭʩʰŀʏĐʟğʵʱʸĲʘǖʧɓʽěʷʹ˂ħʣ˃ˆŷʫʐĔ˅Ėˌˇˏđʳă˅ˎˋʿː˘ĒʻʤĂ˛ˊʼĦ˞˙ˣĐ˅ˁȔ˗ę˕ˤˬ˓ɘɺȹ˰ĆˉĜ˴˭˷ʋɧʒɩ˒Ě˽˸̀ʚˠć˧ɷ˝˯ɼ˾̈̄˩́ʰ˫Ē̅̊̎̔Ď˶̇ʉ˲˟˚̋ȧɋ̍̕ʄ˿̞ʶ˼̠̣ɪ̡̠ɾ˞ʭ̒˱̘̃Č̭̯̫̚ɣ˦̪ĕ̶̩˻̷ˏ̗̱̌Ĥʯˮʛ̰̽̂̿ʍ̨ɹĬʓ̉ɰ̺͋ȳ̴̾ī̮ɩ̼̼͔Ȟ̐Ł͜͝˃̤̜́Ĳ̓ͅˑ͓͢ą̊́˔ͫʦ̟˖ͬɏ͖͊Ȋ̖̝ĵ͙͹͇ʹȤ̹ͳŃ̼͟ͿǬͤȷ̚˨͇΅ġͨͷΏΆȁ͍ȡ̦͑ł͐͂ΒȐͶ̵͚̑ͰĩͼΚΛǺ΍ȱΡŀ͡Υ·ͺɃΡΑ͈ňαΧάƺͮΩ̆˹ōΙζǦΝβ͸̥ͩΫķΣξǙ΁͘ιľυψƼΈʾͩĢαŌϕϏƾΔΗ΢όĽώϘƭπʴϝʬϤĻϗϠȮϦƚϟϩȽήΖēε̳ϫĿϭϮƖθ΂ĪϳϸɈπˢ̲͆ģЁϾʅϊͦīϽІȿϑκ̛ͥςА˵ϰЌʖϚΤБϒğИЖɚϢďχΉ̓ЃЛОɭЋΕǨϵЧȬΈ͟δ̧ЕλЭɀϺσдǵΠͲеϿͺЦρϷΌпǼфу;нȣЈϜϻđтщǧЎчĥбѓϥϓѐȆНУϋм˺͒љȖРΨ͏ΟϛϣѡΓЬφѫѩњг˳вͧΊЂЉѮёлйͽѬўͪѷǪЀцλяĘТɠ҂ѿǌы˥ѭĝ΄ҍ҉ƮђЃίіϧѴτҘґȘѹΞѽрΪϱџқǆѣ͉Аə҄ʮѦЙҤƽЩѧŗҪҮưЯΰҚГŅѕҴƸзͱѺŉνҼƵҁш̙ҙŐ҆ӃƬҋħҳĹӏӋƒғ˜ͷϔҸμӘӒƟћҠӎҐĳӑӛƃҦїѝśӢӣŻҰӪζҶэĨӬĶӲӭŲҾѾЊӠʺӺӵŭӅХхӆМ҈ǔԄӽƇӍѻϼӼİӴԇŮӔВρ΋ҔϦԑʲѰԏƆӝЏКԝДұŊԜԚɵԄ͛ҬңėӥŁԫԤˈԌԒӱ԰ĮԎԮũӯʂӘͯҖԔłԸԶԯԡӖˀҢӸԩԽԬҝԞՀӶԦԨҎՏ҇ԂӕҨԳкՓԒЅՌŤԉєѲѠŃ՝՛Ԑԙ͎ՃĠһՔԓЪէıԑϨգŜԣԀĦӂӞѤķճժձ՜Վ͗Īӊ՘զԍվՠռʎՖѥղ։ևřԿՆįթ֐ԲԼѵ֓֍ŔӷҌĸն՗ӹՂҹԊ֘ŕӿջԁմıց҃ҍ֥Ա֧֦֣ŋբċԵӇϲ԰ֳՒֱ֤ել֡ΐӚӡԺֽФժɌ֒հֻĻպ֮јւӐՅշ˪ՊѨӀְ׊Չ՘ԧӈҭ϶Ցԟĕԭ־сהטļֵ֨ŔөՋ՞צŒ֏Ė֒ņײ֞׆ב̻׃׮ǡץ׎Թҟŋ֢֝גֿ҅׷׺ӻךןֶՕӉ؊֫ϛ՚Ҟ׀؇ծ̠׫؃œҏտьؔĵկׁ؋ի؍׽،խԩӴ׉؝ׅќؒր֌خ׿׏֠ҫت֔ש׍ҧ؜Ś֪חӦذšרʡفƏؗƓكЗׄئִָد֑׹ַЫ֋ز֚̕׵ĩهאرčكّ٘ξ֭ˁؑԪԆŝؼБ׫٢ʢ٤ֹٍ̡֯ٗҡӰ˄ٰٳψ؟ؤפٸˍىŦ׈ؠِԕŐԗˣ׌؁طٻسŪچؽ٣ډʪ׼ٔօحٹםэҩٴύ؎ڌ֛طمĠע˙كڞيƂڣ؄œٝʌװ׸ٸԻځזű״֢ڲǜټآ˘ٕءՈڜՇ֖żڋًسکѶج׬ː٠Ϧ٦Ոڗלžۊ֖یؓڵ؉ۍ̀ؖ԰ؚֆƉۙړԘ؛ˤٷڤՄڭڶрۃؙُ׶ոڧԴۥԝۧΦڐؾغۆظ۳ƈۀכչ۲ċڦȏڠڕ׭ےڽ۫ۛښ۶۽ٍ܀܄ڪژ܂ƺ۾ۭٶڶڮİڴϴƒܗہ֟گѱٲɴڹٛ܎ڌܕƕۀֺԋۂ՟ЇڒڔܘڇĭۏەƔܲ܃Єܭ٢٩͕ۗܟϞܫơۜٯٖ۟ɿۡڧڃ֊ي݈Ƌپٺסۮ֕ە۰ҥۼփ۵ܑڬڰݘŴ۹Ԗݕףڻנжܭוإ܌ļ٦ݛųݩΡ܋ۅݮȇڢܣشƻ۾ݲ͌ܔҷۤŊܚƠݽٮݿ܅ҕЮۼϽܧҺ؆ƩއٚܤۉމΜܸ٫ۚܺڙܳƫܵݦݯޒړޔοܼӧػݳڥܿݥ۴͞ݐܝݴ۬؀ٿƨݍۢݑиޫѸڎ޵޲řݪƊݝ݃յޢƨݰݢ܏޸޾ƀݬ޼߂ǫݓн޹̢ݹܽĤߊǭ߄ƅށڰĢߑӜޅޤٵśߘلޏܛܩޞ۔ܶܨ܈ԠܰԢޛƹޘܮܷٓǃ٭ތ߯ߝߓƖ݁ضǥ݆ڷޙϽ݋קިǀޯ޳ڀ۪ǍڅߠҪ׌ĺࠋƽ޻ԃ޶үݤС܇ϟ߀ĸࠗǁ߆דߤٌْ߱ۘȞݶ߶Ƙګ؛ރۄߕӳߎǫࠪ٧۩ϐߚըߠߦؘߞ࠵߁ࠄǞދݚ࠴ƴۈ࠳ޖѽۑޙࠌޑ߰Ǜ߭ࡀҽޟؿۄޥ۞ۚȖ߸ࠔȥࠁՙҍࠃ߼ޚ࠘ࡗةǦׇ࡚ޭƤࠈ݉ܞ܁۷ĳࡥࠢࠉࡍҵࠓ܅Ĩࠛ۝ĭ࠙ڛȁࡳюࠤӾࡻۣߵˬߌƣࠦܢѳݻࠅ݂ީݡ؂Ȥ࠮ࢊƠܡܯĶ࠼ࡧߢݧ࡛࠸Ȼ࢓۵Ɲࡋ࢑ߧܱ܇ۋ֬ࡇߩߥȼࡊ߫Ƒ߲ߖٙࢇ߹ࡺߏɛࡔơ߻ࠨࡘޕ݊ࡗڼࢷعࢶ࡟ࢌ࠰ࢿƉ࡫࢔ۅٱ࠽ڟݟܪࠑɀࠏƙࡶࢼڌࢁࡕࢦࡈߦࡄࢰࣕࢥɇࡹࢪࠟŜࠣࡦ˙࣓ʆࠬ؅ࢆγ࠰ࢻࢍףࢶʌ࣬Ž࢐ė࢚ࣇࣅࢻ࠶ގ࣯߳࠾Ӥࢤࡷࠧࢩמࡂ؏Йޝ۳आࢲࢡžࢫҿޡࢱݖࡲࡽǬࣤŘࢵ࡙ࡣ׳ࣁࡣࣂޓऒǟजůࣄަҲ࡭߇̈́ञǪऔֲࡰعऑ࣠ࠕ࡮मˤठŢ࠷ƁपЧसۓࢉھ݄ߜŠࣰްࠐ́ऺࠫ࣋ࢮिťࣴऽˡनҤ࢝ߡ࢟ثॅ࣢ܹँږॎѩऌ࢛ġश֜ߛ्صěखࡃघٖऴŘࡡݞޱॢࣶ࠹܉߳ࠊ࣊ŧ࣎ĝࠍצ࣐ࣝݏࠝڱर॓ॳؔݷܜ޺ࠠ७Ęࢃޜࣼऄ݇ख़ׂࣨ֐ुևࣲױঊ८՘फ़΃কݗচֱॐĜࢨॼईڊऊःࠆࣿ֍ज़টॠभƇࢳবت।߂ࢾछ०ݜचݎ६ռढलখࣛࣆভथࡒ֣ॹࣟࣚধ࢖ޣথ॒ࡨԶঘऍ߬঍҉ঈ॑Į঑ࢗীএࣷԤওٮĴोস݌জौԏঞހݳঠা۸ত৆Ӓ঩ৣݨফƜমԇ঱ࣅ२ӟএ৷Ɔ४Ӫ঻৯ো࢒ুƢॵӋৄ৊॔अब৲ॾҴংऎݵ৑˷৓ޥ࣮ވ৙ƥ৖Ϙড়दৗńয়Ɲਟϩ৥ءঢࢭࡅޗ৫Ү۾ਈ৏Ƹਬˏة৺ࢽ਑इ਴ūਲζۺࡎ߃Ƽਯˇ਺णŖਾŻ੃আ੆ωৱߴŚৎࣱਸ਼݅੉ߗ੎ाƶੌʱॖࣖॻ৩ڏ੘ࡤॗѿٜ੒ࢋ੔੡ࣻ৹঵ࢄ़ߪহƦ߿Ϡ਄ॣঀיৌ੬ੱеॺक़࣌ࡆॼੴ੻ґ࣡ࡿƻ੕͢৖ਓ׻হંवࣦӒਡ࡛ઌܒৌઈـ࠲ԏ২࣒਩ǉࣾ਀Əਣӣ৳॰աऱߙਜԮৼਲ਼࡝੫ۯ੤ň৵Զ੯ࡱࡪੵ९Ǝ৾՛੷যঃ܈ੀળਊટև੅ࠜઁપѮ઄অদड़ࣺɜઊ৚֘ઌ੠ेࡏԈઓૐצકચڈڝગਥդড߫૚ઔ੐ढ़ડ੢ƅ৮ৠؔથĞબࢢ૦ࣥનઇࢺ֣મીৈݠ৿િࠀ੹९ॷ֍શࠩ઱Җࣘԥ੽ނ઼ॢ੿਻ƈ਎ੇ׾ࢹ੸଍ଌঌŴઅ଄ૈੇ્૒Րକŧਛূ૬ଋ࣑ચજࣧ৬ս૜ੜદਗ਼ଖૠૹںडૢ߈ଟݙ଑੩ਉ޽ଞŗ૪Ύ੧଱܈઴ରઉବ଩ଐ଼ଲؘ߮ऐ৸઒ଃષध̎ઑ঎ુ७୏य़ਗૣߐૂࣗ࣪੓ߒˬ૞ţଗٞੋଘોଡ଼۠୘ਁ৊૫୥েŇଢ࠯ॡୂ̬ਫ਼ŵઞੑࠡࡴୖ੊ڡ୧͠ষू૾ଷľହݒ५଴ʕ੭Ź૲ই૿ऻ૴૏িثେܬୁष਌஋ୋԾଅ࣭சڳ஌ɇ࣐ſଇ֎৅࢕୻ƭૄ૯ńଓନঽ࢞ਙ΀૊߷ৢٸ઎ࡵୣࡾ஭৔ૺ୼Ϫஏਠ૙ઙਯ୮ঔ୩ېՊ୞ȅ௃லए૵ஂଯ୍ैયɬ૥Ϭ୾࠺ଠĴஃ޷঳૬ਸȃ࡞଻ܙਂࣙॆੳ்ିي઺ȼାਘ஖௤ઘ஘ઽ۴ਆȴ௴ਨ୷਼୦Ǵநસ௼ܖ୚୹Ȃ஫ஹފள୿ॶஷఁࢠଚఄѪா୛Ʊ૕٨ுʧைপ௅ఘ߉ఔ஝৐ௌࣉણঢ়ं௑ݱ௏஺ƿ૨ఈ૮ஆ߮ੌనǳ௚߽஼ũஊڍ௦ఏଧ௿ॱలࣃஞଽఽƯ૽ঐఽుĺౄੈ௱ݖ஠Ʈ஢়௹ȝଊ࠭ఀ੨૆ࢎউఌҗ୕ǒః௲ਕǅୠઐࣹࢬਞఆɁఉୃౕǈఒே୳౜౬౅ગϙఛ௛౮ܐଫశ޷३఻ɮథӗ௻௖ਝఫగఇङ஁ӄ௠ಅౖࡠ௣ࡐ୉ਏݔஔ૖ஸओ௮ಌଶӨ౺Էஜ౷ਭऩಘ୎ಞȂ௾࢈ୢ࠱னణୗȅ౟஥कಠŠଜ఍టࡓீసూǏ౴ϯଦাఖ০ȗ୵ૡ௸ࡌఠ౗ߨࢧ౿߾૰௎పƢరబஅ౔ȝఴ૗எઠಐƚ௬ઍ೎ஐȬెజಛ׋ಚƜ௶୆લ१ిǹౌସಭֈ࣢ࢯʖಢயୡ௘৿ೖறऀೃெౙ೅೷ழ౤௰ౠ੝ష౧ೳడগ೪ƣ౪ؐಷ୫હ౰ƍொ೶಺౲ɭಾೕஶೂƗ௔ଣ૓ୌʄమ஛ધಁ઩ࠥಇಃ୅௜ఇ௞࡬఺ഗಫ೤കƀ೗౽ࣈଝ੥৬௪ೱଁࣔƐೢ్഼ʕ૷వη೪ീɈಢࢯെ૑ದഛ਻ౝ౓ʸಪಣ೚ௗ౨Ƃಯેޠൗರʨഈഋࣘ੗ୱ૭૘ఙਧࢅତ೸˘ഔृ୸ൎଉ౼ഄܾఞ൨ೆ೙਱൳രതଳ೏୔ଏൺ൲ഫ൪൒௲౨ൄઆೞࣸയ൘ඃആǆ೜ൎഹଔൢŹೢొॕೠਰૅੁ૤த౎੮౒மඞ௯്Ŭ౛౉೽৞චॄ೽ൖಕഥୀ೿౸ഃౣ೻˷൜اഊබ಴ಬಹ୬ਔභͻ഍˸൩೓ಜ૛ഴௐಎඝ੦௝௡ලŨೌಂ൓ਖත̕೑௧෇ťറ଺यϸඍසଙ୊එ൫෗౹ಈ̎඄଒උෛϮൈ୰ತఫܥ೭٥෩ǳ൐෱ಶഁ࢞෶ୄැೣ॥෭಑பഒ॑ఓඹ෻ංఐ୺යෆదഋฆ௳Յഩ൧ෑ೉ഡൊೲॿ෥ฎඬڧॲඈ௥ෞඇආจ෧ૼಔਖ਼ખ੪෡ඡඖ୙พบปฉ೩೬ॉฯࢸ൹ವർੲൽณଵౢঋ࡛୓׺෵஻ก෸ࣳඪ౦ีఋ൦ਇව௽౫ฅഉࡈഏ๊಍֗௒஍௯్୤ࡩ๕ਦเ൸ಀ஥൵นഺ๠ೊท๞֩ಋ๦௙ృඛඊബ๪৕ฦ๘๣๯ඕైූ๳୐෮෈๼ॴඨ൯ನ෯౶෗ජฌ຀ൻ൚ຌ఩දോَඳ฼ຊ๫ൣ෽඀൞૝඾෼ൟ඼ດ๽๗ญ๭จ౯൱ຟ୽්ීඟ෋ຩຓฏ෾ສວຠ๱඀ஒๆീ෕າຨശݭฬഢสࣵທພ຺ລસ๛तໄୟຂະื௄ู಄໏້ެຒ೘໔ୈ๥຋൙໒໐൤฿ۦປ຿ໃ൰์໛Ňෂඁല๿໥෈ധௗฑ๒ŕ໯໫๟ິ෢ުග໳ගാಖ໪໹ੂෳ໾ఝ໑ఊಱ๾༁ෲ໔૎઀༇໊ຖ಻໌ڨ໠༌ໜມຄ༆༓਷൶ຘ෌අ฻༘şູಧ฀๙ຶ༟ी๵ࢇඏ೔ເ༦ກೱช༭க೹ฃ໋ۻถ༱Ŭใഅๅຏ༸Ųඵ࡜ൠേ๐ག༾༈༢໗༤ຣཆஉ༚ਵഠ༞ໟཌŸ༡ภิമยན༙ํ๲୶༬๶ཚݫ೪แཡŤ෬൝༵ຍཥŰ༺ຢ༻཈ཫźཀཞศ໤ໝཱڿຆຎ໶࢘ླྀ৪ອ๢ุ໮ཎཾߔ๬஑མ࢖ૻ྅རཛྷ૳ഌഐཱུྌ঄༯๖ྒྷƟ೯ཀྵ౭໖ྗཌྷ༉้็ྜྜྷŽཱི໡༣ཏཅྣཹ຦໨ේྪƞഞ໰ງༀྯ඿ൿོྮྵƛෝྭࡁ෠ྺටಥ࿀໅ໍ຤ಿ་ྦྷ࿃௨ຮ༊༗࿊ແຝ࿉࣫఻༏࿏࿋ຉั෷࿖Ŏྱྏ໲ք๨࿛໙໵ཻ྽༫བ࿢ౘຼธཙ༶ཟ࿩ිഭ࿚࿰šྙ༳੺຅࿴أ฾ஹவྕ཯࿺ۨ༎ข࿸ྒໂခ໓཰ฮ෺๝ဈ෤ู๤ັུ๩මဎ່ളྸ࿿ൠฤဖझ๺ဋวྐซဝŒလ༕ဤ৉༃൬ॉཧဨဏཪනີไညီုဇ୪༖ဢཷ୯ဵ།ဴ૩൮ྡྷွ໿ྀೇ๨࿝၃༧ྷ࿥༥ྊ೦၉໱༨஀࿭૆༪ၐས඘໇ၗྤྚး๧ୃຈၛٽ่ๆ໎ူၢှျၞདྷྩ฽໢ၨ၊ဿ࿦හၰཔ྄ඥ໼ཱྀၵŨཕၳෟၻ੄ၒงၹႀၶႅǲိ࿙ႇྞ࿼໚ೄႋဩၪฒ୺ဦ႐࿣࿆༅႖ƌ၈ുနႚ஡྇ྏ၍႟ێႂ࿓ဠႤŮ೨Ⴉி࿷಼ဪႬཿႍ࿤ൔႱྔྲྀဇ߭ႶƄ໧ႣႻߟ၅ʧ࿟ႿŷၽႾჄႛႦ๻჈௢჌ǎႉ჎ோႳေბƗྥვྰེი྘ၷმഇႡპ௭ྎსƪ႕ფŶ೰ყზඦცკຖჭƤღჰॽ໘ჳნჶࠎ༜ჸხ჻౵ჽჿᄀᄁᄂᄃᄄᄅᄆᄇᄈᄉᄊᄋᄌᄍᄎᄏᄐᄑᄒᄓᄔᄕᄖᄗᄘᄙᄚᄛᄜᄝᄞᄟᄠᄡᄢᄣᄤᄥᄦᄧᄨᄩᄪᄫᄬᄭᄮʩ'],
[1,0,0,0,0,1,1,1,1,1,1,0,0,1,1,1,0,1,0,0,0,0,282,140,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǧ1Āǽ0ǿȁǾȃȀȄȂǻƅǿęȊȈƂȌėȏȍſȑĕȔȒżȖēșȗŹțđȞȜŶȠďȣȡųȥčȨȦŰȪċȭȫŭȯĉȲȰŪȴćȷȵŧȹąȼȺŤȾăɁȿšɃāɆɄŞɈȅɉŷɋɋɍŚɏɑȢěɐɔŗɓɘȧɖɛɜĚɗɞœɚɢůɤɥȱɝɨŮɧɫȶɪɮūɭɱȻɰɴŨɳɷɀɶɺťɹɽɅɼʀŢɿʃɊʂʆşʅʉśʋʌřʎʏəʈʒɒʔʕŘʑʘɣʗʛŕʚʞŐʠʡŎʣʤŌʦʧŊʩʪňʬʭņʯʰńʲʳłʵʶŀʸʹľʻʼļʾʿĺˁ˂ĸ˄˅ĶˇˈĴˊˋĲˍˎİːˑĮ˓˔Ĭ˖˗Ī˙˚Ĩ˜˝Ħ˟ˠĤˢˣĢ˥˦Ġ˨˩Ğ˫ˬĜˮ˯ɠʝ˲ķ˱˵Ȑ˴˸ˌ˺˻ˏ˽˾˒̀́˕̃̄˘̆̇˛̉̊˞̌̍ˡ̏̐ˤ̒̓˧̖̕˪̘̙˭̛̜˰̞̟˳̢̣į˷̥Ḉ̨Ą̪̫Ă̭̮Ȅȋ̴̶̷̱̤̹̺̼̗̝̠͈͉̈̎̑̔̽̿̀͂̓͆͋̚ͅĐɡ͌ɂ̡͐ȳ͓͒ȸ͕͖Ƚ͙͍͑͘͜Ę̢̰̱̮̫̥̟̜̙̄ͣͥͧͩͫͭͯ͡ͱ̖ͳ̓͵̐ͷ̍͹̊ͻ̇ͽ̄Ϳ́΁˾΃˻΅˸·˵Ή˲΋˯ȇΏȆΑɌ͏͟ΕΖΗΘΙΚΛΜΝΞΟΠΡ΢ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϡϢϣϤɉ'],
[0,2,2,0,1,0,1,1,0,0,0,1,1,0,1,1,0,0,0,0,640,320,''],
[1,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,288,140,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺƄ1Āǽ0ǿȁǾȃȀȄȂȅȈȇȊȆȌȉȍȋȎȑȐȓȏȕȒȖȔȗȚșǿǖȜȘȠțȡȟȢȥȤȧȣȩȦȪșǐȨȫȰȯȲȬȴȱȵȳȶȰǍȸȼȷȾȹȽɀȿɁȯȻɃɇɂɉɄɈɋɊȵɆɎɑɍɓɌɕɒɈɐɔɗɛɚɝɖɞȈəɟɣɜɤɠɧɏǌɨɥɬɫɮɦȖɢɭɰɳɵɯɶǏɷɺɴɻɸɉɲɽʁɼʃɾȭɪʄʂʅʈʋȥʀʌʉʐʏɤʎʊʕʑʖʄʔʗʛʒʘɿʇʞʜʡʝɚʚʤʧʣʩȸʦʪʨʢʯȄʬʰʭʴʢʲʮʸʵʹȝʠʳʾʻʹʷʺ˃ʿʕ˂˅ˈˀɬˇˊˉ˄ʓʽˍ˒ˏʩˌ˔ˎ˘ɩǋ˙˗˓ɷ˖˜ˡ˞ɱˑ˝˦ˢɛˠˣ˧˫Ʌ˥˨˰˭ȡ˪ˬ˵˱ɡ˯˲˶˺ʫ˹˻˿˷Ȑ˴́˼˫̃̅̀˺̇̉̌˅̋̄̍ˁ˾̐̔̆̓̈̕˿̘̜̏˔̛̠̑ʗ̟̙̤ɴ̣̝̥ˆ̡̨̗̫̩̰̊ʝ̴̧̬˟̵̯̭˓̳̱̹˩̷̼̽ɽ̸̻́ɖ̓̀̈́ː˛͉͈˵͇͍ͅˮ͕͋͑͌̎̿͐͆͗͘͜˕͔͛͠ɠ͏͙͝Ⱥͥͨ͟˚Ǌͩ͡ʌͣͭͰ̂ͧͤʹɾͯͬͥͷ͵͸ʱͳͱͻɘ;ͼͿʍ΂΀΄˽͓΃΋ȿͺΈ·ʼΊΐΓ̪ΒΏΗɍΎΌ͍ΚΔ͹ΆΘΞˤΖΛΥ˳ΠΦΗΝΡΜΨ΢άȇΫΩ̐βί̼εΰ͌θγ̝λζ͝ξι̠ρμ̚ήςͬτο̴ϊψ̈ύυˎϐϋ˷ϓώ͎χϑ·ϖϚ̞ϙϔϋϜϠφΤϣϝαϟϗ͐ȮϦϭ΅ǔϧϣǻϳϴϵ϶ϷϸϹϺϻϼϽϾϿЀЁЂЃЄЅІЇЈЉЊЋЌЍЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюяѐёђѓєѕіїјљњћќѝўџѠѡѢѣѤѥѦѧѨѩѪѫѬѭѮѯѰѱѲѳѴѵѶѷѸѹѺѻѼѽѾѿҀҁđ'],
[1,0,0,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,640,320,''],
[1,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,1,1,0,704,350,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣʤʥʦʧʨʩʪʫʬʭʮʯʰʱʲʳʴʵʶʷʸʹʺʻʼʽʾʿˀˁ˂˃˄˅ˆˇˈˉˊˋˌˍˎˏːˑ˒˓˔˕˖˗˘˙˚˛˜˝˞˟ˠˡˢˣˤ˥˦˧˨˩˪˫ˬ˭ˮ˯˰˱˲˳˴˵˶˷˸˹˺˻˼˽˾˿̴̵̶̷̸̡̢̧̨̛̖̗̘̙̜̝̞̟̠̣̤̥̦̩̪̫̬̭̮̯̰̱̲̳̹̺̻̼͇͈͉͍͎̀́̂̃̄̅̆̇̈̉̊̋̌̍̎̏̐̑̒̓̔̽̾̿̀́͂̓̈́͆͊͋͌̕̚ͅ͏͓͔͕͖͙͚͐͑͒͗͛ͣͤͥͦͧͨͩͪͫͬͭͮͯ͘͜͟͢͝͞͠͡ͰͱͲͳʹ͵Ͷͷ͸͹ͺͻͼͽ;Ϳ΀΁΂΃΄΅Ά·ΈΉΊ΋Ό΍ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ΢ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϡϢϣϤϥϦϧϨϩϪϫϬϭϮϯϰϱϲϳϴϵ϶ϷϸϹϺϻϼϽϾϿЀЁЂЃЄЅІЇЈЉЊЋЌЍЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюяѐёђѓєѕіїјљњћő1ќџѠѡѢѣѤѥѦѧѨѩѪѫѬѭѮѯѰѱѲѳѴѵѶѷѸѹѺѻѼѽѾѿҀҁ҂҃҄҅҆҇҈҉ҊҋҌҍҎҏҐґҒғҔҕҖҗҘҙҚқҜҝҞҟҠҡҢңҤҥҦҧҨҩҪҫҬҭҮүҰұҲҳҴҵҶҷҸҹҺһҼҽҾҿӀӁӂӃӄӅӆӇӈӉӊӋӌӍӎӏӐӑӒӓӔӕӖӗӘәӚӛӜӝӞӟӠӡӢӣӤӥӦӧӨөӪӫӬӭӮӯӰӱӲӳӴӵӶӷӸӹӺӻӼӽӾӿԀԁԂԃԄԅԆԇԈԉԊԋԌԍԎԏԐԑԒԓԔԕԖԗԘԙԚԛԜԝԞԟԠԡԢԣԤԥԦԧԨԩԪԫԬԭԮԯ԰ԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿՀՁՂՃՄՅՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔՕՖ՗՘ՙ՚՛՜՝՞՟ՠաբգդեզէըթժիլխծկհձղճմյնշոչպջռսվտրցւփքօֆևֈ։֊֋֌֍֎֏֐ְֱֲֳִֵֶַָֹֺֻּֽ֑֖֛֢֣֤֥֦֧֪֚֭֮֒֓֔֕֗֘֙֜֝֞֟֠֡֨֩֫֬֯־ֿʊ'],
[0,2,3,0,0,1,1,1,2,1,0,1,2,1,1,0,2,1,2,0,0,0,0,0,1,0,1,0,640,320,''],
[1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,1,1,0,1,0,1,1,470,234,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣʤʥʦʧʨʩʪʫʬʭʮʯʰʱʲʳʴʵʶʷʸʹʺʻʼʽʾʿˀˁ˂˃˄˅ˆˇˈˉˊˋˌˍˎˏːˑ˒˓˔˕˖˗˘˙˚˛˜˝˞˟ˠˡˢˣˤ˥˦˧˨˩˪˫ˬ˭ˮ˯˰˱˲˳˴˵˶˷˸˹˺˻˼˽˾˿̡̢̧̨̛̖̗̘̙̜̝̞̟̠̣̤̥̦̩̪̫̬̭̮̯̰̱̲̀́̂̃̄̅̆̇̈̉̊̋̌̍̎̏̐̑̒̓̔̕̚ɺ1̶̷̸̳̹̺̻̼͇͈͉͍͎̽̾̿̀́͂̓̈́͆͊͋͌ͅ͏͓͔͕͖͙͚͐͑͒͗͛ͣͤͥͦͧͨͩͪͫͬͭͮͯ͘͜͟͢͝͞͠͡ͰͱͲͳʹ͵Ͷͷ͸͹ͺͻͼͽ;Ϳ΀΁΂΃΄΅Ά·ΈΉΊ΋Ό΍ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ΢ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϡϢϣϤϥϦϧϨϩϪϫϬϭϮϯϰϱϲϳϴϵ϶ϷϸϹϺϻϼϽϾϿЀЁЂЃЄЅІЇЈЉЊЋЌЍЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫȣ'],
[0,2,7,1,0,1,0,1,1,0,0,0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,1,0,1,0,1,640,320,''],
[0,3,2,0,1,2,0,2,1,2,1,2,0,2,1,2,1,0,0,0,0,1,0,1,0,1,1,1,640,320,''],
[1,0,0,1,0,0,0,1,1,1,1,0,1,0,1,1,0,0,0,0,0,0,470,234,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣʤʥʦʧʨʩʪʫʬʭʮʯʰʱʲʳʴʵʶʷʸʹʺʻʼʽʾʿˀˁ˂˃˄˅ˆˇˈˉˊˋˌˍˎˏːˑ˒˓˔˕˖˗˘˙˚˛˜˝˞˟ˠˡˢˣˤ˥˦˧˨˩˪˫ˬ˭ˮ˯˰˱˲˳˴˵˶˷˸˹˺˻˼˽˾˿̡̢̧̨̛̖̗̘̙̜̝̞̟̠̣̤̥̦̩̪̫̬̭̮̯̰̱̲̀́̂̃̄̅̆̇̈̉̊̋̌̍̎̏̐̑̒̓̔̕̚ɱ1̶̷̸̳̹̺̻̼͇͈͉͍͎̽̾̿̀́͂̓̈́͆͊͋͌ͅ͏͓͔͕͖͙͚͐͑͒͗͛ͣͤͥͦͧͨͩͪͫͬͭͮͯ͘͜͟͢͝͞͠͡ͰͱͲͳʹ͵Ͷͷ͸͹ͺͻͼͽ;Ϳ΀΁΂΃΄΅Ά·ΈΉΊ΋Ό΍ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ΢ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϡϢϣϤϥϦϧϨϩϪϫϬϭϮϯϰϱϲϳϴϵ϶ϷϸϹϺϻϼϽϾϿЀЁЂЃЄЅІЇЈЉЊЋЌЍЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫȬ'],
[0,3,2,1,0,0,0,1,0,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,640,320,''],
[1,0,0,0,1,0,0,1,1,1,0,0,1,1,0,0,0,1,0,0,0,0,469,233,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣʤʥʦʧʨʩʪʫʬʭʮʯʰʱʲʳʴʵʶʷʸʹʺʻʼʽʾʿˀˁ˂˃˄˅ˆˇˈˉˊˋˌˍˎˏːˑ˒˓˔˕˖˗˘˙˚˛˜˝˞˟ˠˡˢˣˤ˥˦˧˨˩˪˫ˬ˭ˮ˯˰˱˲˳˴˵˶˷˸˹˺˻˼˽˾˿̴̵̶̷̸̡̢̧̨̛̖̗̘̙̜̝̞̟̠̣̤̥̦̩̪̫̬̭̮̯̰̱̲̳̹̺̻̼̀́̂̃̄̅̆̇̈̉̊̋̌̍̎̏̐̑̒̓̔̽̾̿̀́͂̓̕̚ʳ1Ā͉͍͎͆̈́͊͋͌͏͓͔͕͖͙͚͐͑͒͗͛ͣͤͥͦͧͨͩͪͫͬͭͮͯ͘͜͟͢͝͞͠͡ͰͱͲͳʹ͵Ͷͷ͸͹ͺͻͼͽ;Ϳ΀΁΂΃΄΅Ά·ΈΉΊ΋Ό΍ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ΢ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϡϢϣϤϥϦϧϨϩϪϫϬϭϮϯϰϱϲϳϴϵ϶ϷϸϹϺϻϼϽϾϿЀЁЂЃЄЅІЇЈЉЊЋЌЍЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪ̧'],
[0,3,3,0,0,1,2,2,0,0,1,2,2,1,1,2,0,0,0,2,0,0,2,2,0,0,1,1,1,2,2,2,1,1,0,2,2,0,1,2,640,320,''],
[0,3,3,0,2,0,1,2,2,1,1,1,1,0,0,1,0,0,2,2,2,1,1,2,0,0,1,0,0,1,2,1,1,0,2,0,0,0,0,0,640,320,''],
[1,0,0,0,0,1,0,1,0,1,1,0,1,1,1,1,0,0,0,0,0,0,469,233,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣʤʥʦʧʨʩʪʫʬʭʮʯʰʱʲʳʴʵʶʷʸʹʺʻʼʽʾʿˀˁ˂˃˄˅ˆˇˈˉˊˋˌˍˎˏːˑ˒˓˔˕˖˗˘˙˚˛˜˝˞˟ˠˡˢˣˤ˥˦˧˨˩˪˫ˬ˭ˮ˯˰˱˲˳˴˵˶˷˸˹˺˻˼˽˾˿̡̢̧̨̛̖̗̘̙̜̝̞̟̠̣̤̥̦̩̪̫̬̭̮̙̀́̂̃̄̅̆̇̈̉̊̋̌̍̎̏̐̑̒̓̔̕̚1Ā̱0̳̯ſ̵̶̳̲Ž̸̴̺̻̾ŷ̹͇̽̿̈́́͂̾̓͆ŵ͊͌͏͓͔͕͖͙͚͐͑͒͗͛ͣͤͥͦͧͨͩͪͫͬͭͮͯ͘͜͟͢͝͞͠͡ͰͱͲͳʹ͵Ͷͷ͸͹ͺͻͼͽ;Ϳ΀΁΂΃΄΅Ά·ΈΉΊ΋Ό΍ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ΢ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϡϢϣϤϥϦϧϨϩϪϫϬϭϮϯϰϱϲϳϴϵ϶ϷϸϹϺϻϼϽϾϿЀЁЂЃЄЅІЇЈЉЊЋЌЍЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп͓'],
[0,3,3,0,1,0,2,0,1,1,2,2,1,0,0,1,0,0,0,0,2,0,0,1,0,0,0,0,0,1,2,1,0,1,1,1,1,0,2,0,640,320,''],
[0,3,4,0,1,0,3,0,2,0,0,2,2,0,2,0,3,1,1,2,0,0,1,1,0,0,0,0,0,0,1,1,1,2,0,2,3,0,3,1,0,0,0,0,1,0,1,1,0,0,0,0,640,320,''],
[1,0,0,0,0,1,1,1,0,0,1,0,0,1,1,1,1,0,1,0,0,0,352,175,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑư1Āʔ0ʖʘʕʚʗʛʙʜʟʞʡʝʣʠʤʢʥʟʒėʖŘʬʪĕʮŖʱʯĒʳŔʶʴďʸŒʻʹČʽŐˀʾĉ˂Ŏ˅˃ĆˇŌˊˈăˌŊˏˍʛʭ˒Đˑň˗ˍ˙ņ˛˃˝ń˟ʹˡłˣʯ˥ŀ˧ʒ˩ľ˫ʐ˭ļ˯ʎ˱ĺ˳ʌ˵ĸ˷ʊ˹Ķ˻ʈ˽Ĵ˿ʆ́Ĳ̃ʄ̅İ̇ʂ̉Į̋ʀ̍Ĭ̏ɾ̑Ī̓ɼ̕Ĩ̗ɺ̙Ħ̛ɸ̝Ĥ̟ɶ̡Ģ̣ɴ̥Ģ̇ɲ̩Ğ̫ɰ̭Ĝ̯ɮ̱Ě̳ɬ̵Ę̷ɪ̹Ė̻ɨ̽Ĕ̿ɦ́ʵ˕ʺŚ̓ɤ͈˖ͅĎʧ͎ʦ͐ʨ͏͓͒͑ʧ͙͚͌͛ͣͤͥͦͧͨͩͪͫͬͭͮͯ͘͜͟͢͝͞͠͡ͰͱͲͳʹ͵Ͷͷ͸͹ͺͻͼͽ;Ϳ΀΁΂΃΄΅Ά·ΈΉΊ΋Ό΍ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ΢ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϡϢϣϤϥϦϧϨϩϪϫϬϭϮϯϰϱϲϳϴϵ϶ϷϸϹϺω'],
[0,3,4,0,1,0,2,1,1,1,3,2,1,0,1,1,2,0,0,2,2,1,2,2,3,1,0,2,2,2,3,2,0,0,2,0,0,0,0,0,0,0,0,0,3,0,3,1,0,0,0,0,640,320,''],
[0,4,2,0,0,0,0,0,0,1,1,3,1,1,0,3,0,0,0,0,1,1,1,2,0,0,1,0,0,1,1,1,0,0,1,0,640,320,''],
[1,0,0,0,0,1,0,0,0,1,0,0,1,1,1,1,0,0,0,0,0,0,288,140,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅǶ1ĀɈ0ɊɌɉɎɋɏɍɐɓɆĳɒɗɑəɓɘɕĭɜɟɚɠɛɚɝĥɢɧɡɩɣɥɦɪɨɫɯɊɬģɱɮɶɰɳĤɵɸɼɯɹħɻʁɿĮʂɽɤʃʈʉʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣʤʥʦʧʨʩʪʫʬʭʮʯʰʱʲʳʴʵʶʷʸʹʺʻʼʽʾʿˀˁ˂˃˄˅ˆˇˈˉˊˋˌˍˎˏːˑ˒˓˔˕˖˗˘˙˚˛˜˝˞˟ˠˡˢˣˤ˥˦˧˨˩˪˫ˬ˭ˮ˯˰˱˲˳˴˵˶˷˸˹˺˻˼˽˾˿̛̖̗̘̙̜̝̞̟̠̀́̂̃̄̅̆̇̈̉̊̋̌̍̎̏̐̑̒̓̔̕̚Ɲ'],
[0,4,4,0,1,0,1,2,3,2,1,2,0,0,1,2,2,0,0,3,2,0,1,3,3,1,0,3,3,1,2,3,1,0,2,0,3,1,3,2,3,0,0,2,2,0,0,1,0,0,1,0,0,1,1,2,2,0,3,3,0,2,1,3,1,0,3,1,640,320,''],
[0,4,4,1,1,0,0,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,1,0,1,0,0,0,0,1,0,0,0,0,0,0,1,1,1,0,1,0,1,0,1,0,1,0,0,1,0,0,0,0,1,0,0,1,1,0,1,1,0,0,1,0,640,320,''],
[1,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,1,0,0,704,350,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏɐɐ1ɑɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽɾɿʀʁʂʃʄʅʆƱɓʇʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣʤʥʦʧʨʩʪʫʬʭʮʯʰʱʲʳʴʵʶʷʸʹʺʻʼʽʾʿˀˁ˂˃˄˅ˆˇˈˉˊˋˌˍˎˏːˑ˒˓˔˕˖˗˘˙˚˛˜˝˞˟ˠˡˢˣˤ˥˦˧˨˩˪˫ˬ˭ˮ˯˰˱˲˳˴˵˶˷˸˹˺˻˼˽˾˿̀́̂̃̄̅̆̇̈̉̊Ńʉ̴̵̶̷̸̡̢̧̨̛̖̗̘̙̜̝̞̟̠̣̤̥̦̩̪̫̬̭̮̯̰̱̲̳̹̺̻̼͇͈͉͍͎̋̎̏̐̑̒̓̔̽̾̿̀́͂̓̈́͆͊͋͌̕̚ͅ͏͓͔͕͖͙͚͐͑͒͗͛ͣͤͥͦͧͨͩͪͫͬͭͮͯ͘͜͟͢͝͞͠͡ͰͱͲͳʹ͵Ͷͷ͸͹ͺͻͼͽ;Ϳ΀΁΂΃΄΅Ά·ΈΉΊ΋Ό΍ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ΢ΣΤΥΦΧΨɑʉ̍ΩέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϡϢϣϤϥϦϧăάϨϫϬϭƽϪϮϱϲϳϴϵ϶ϷϸϹϺϻϼϽϾϿЀЁЂЃЄЅІЇЈЉЊЋЌЍЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫȭϰЬЯабвгдежзийклмнопрстуфхцчшщъыьэюяѐёђѓєѕіїјљњћќѝўџѠѡѢѣѤѥѦѧѨѩѪѫѬѭѮѯѰѱѲѳѴѵѶѷѸѹѺѻѼѽѾѿҀҁ҂҃҄҅҆҇҈҉ҊҋҌҍҎҏҐґҒғҔҕҖҗҘҙҚқҜҝҞŊЮҟҢңҤҥҦҧҨҩҪҫҬҭҮүҰұҲҳҴҵҶҷҸҹҺһҼҽҾҿӀӁӂӃӄӅӆӇӈӉӊӋӌӍӎӏӐӑӒӓӔӕӖӗӘәӚӛӜӝʽҡӞӡӢӣӤӥӦӧӨөӪӫӬӭӮӯӰӱӲӳӴӵӶӷӸӹӺӻӼӽӾӿԀԁԂԃԄԅԆԇԈԉԊԋԌԍԎԏԐԑԒԓԔԕԖԗԘԙԚԛԜԝԞԟԠԡԢԣԤԥԦԧԨĄӠԩԬԭԮԯ԰ԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿՀՁՂՃՄՅՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔՕՖ՗՘ՙ՚՛՜՝՞՟ՠաբգդեզէըթժիլխծկհձղճմյնշոչպջռսЄԫվցւփքօֆևֈ։֊֋֌֍֎֏֐ְֱֲֳִֵ֑֖֛֢֣֤֥֦֧֪֚֭֮֒֓֔֕֗֘֙֜֝֞֟֠֡֨֩֫֬֯ưրֶֹֺֻּֽ־ֿ׀ׁׂ׃ׅׄ׆ׇ׈׉׊׋׌׍׎׏אבגד֖'],
[0,4,4,0,3,0,3,1,3,0,0,2,1,1,0,2,0,1,2,3,3,0,1,3,2,0,3,0,0,0,3,3,2,1,0,2,2,1,1,2,2,0,1,3,0,0,0,0,2,1,3,1,0,0,3,3,3,1,3,3,3,1,2,2,1,0,1,1,640,320,''],
[0,4,4,0,1,0,2,0,1,2,0,3,2,3,2,3,1,0,0,1,0,3,1,1,0,1,1,0,1,2,3,1,1,3,3,0,2,1,0,2,0,3,0,2,1,0,0,3,3,0,0,0,0,2,3,0,0,3,2,2,0,2,3,0,3,0,2,1,640,320,''],
[1,0,0,1,1,0,1,1,0,0,0,0,1,0,1,1,1,0,0,0,0,0,281,140,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏɐɑɒɓɔɕė1ɖəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣʤʥʦʧʨʩʪʫʬʭʮʯʰʱʲʳʴʵʶʷʸʹʺʻʼʽʾʿˀˁ˂˃˄˅ˆˇˈˉˊˋˌˍˎˏːˑ˒˓˔˕˖˗˘˙˚˛˜˝˞˟ˠˡˢˣˤ˥Ɖ'],
[1,0,0,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,206,100,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǆ1ǲǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏɐɑɒɓɔɕɖɗɘəɚɛɜɝɞƬ'],
[0,4,4,1,1,1,1,0,1,1,1,0,1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,1,0,1,1,1,1,0,1,0,0,0,1,1,0,1,0,0,1,1,0,1,0,0,0,1,0,1,1,1,1,0,1,0,0,1,0,0,1,0,1,1,640,320,''],
[0,4,4,1,1,1,1,1,1,0,0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,1,0,0,0,0,1,1,0,1,0,1,0,1,1,1,0,1,0,1,1,0,1,0,0,640,320,''],
[1,0,0,0,0,1,0,1,0,0,0,0,0,1,1,0,0,1,0,1,1,0,288,140,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉȊ1ĀɌ0ɎɐɍɒɏɓɑɔɗɖəɕɛɘɜɚɝɠȼɎšɣȵɥťɧȰɩţɫȮɭɤɦũɯȬɳşɵȪɷŝɹȨɻśɽȦɿřʁȤʃŗʅȢʇŕʉȠʋœʍȞʏőʑȜʓŏʕȚʗōʙȘʛŋʝȖʟŉʡȔʣŇʥȒʧŅʩȐʫŃʭȑʯĻʱȕɟʵɞʷɠʶʹʸʺʺɊʿˀˁ˂˃˄˅ˆˇˈˉˊˋˌˍˎˏːˑ˒˓˔˕˖˗˘˙˚˛˜˝˞˟ˠˡˢˣˤ˥˦˧˨˩˪˫ˬ˭ˮ˯˰˱˲˳˴˵˶˷˸˹˺˻˼˽˾˿̴̵̶̷̸̡̢̧̨̛̖̗̘̙̜̝̞̟̠̣̤̥̦̩̪̫̬̭̮̯̰̱̲̳̹̺̻̼͇͈͉̀́̂̃̄̅̆̇̈̉̊̋̌̍̎̏̐̑̒̓̔̽̾̿̀́͂̓̈́͆̕̚ͅǃ'],
[0,4,7,1,0,0,1,0,1,1,0,0,0,1,1,1,0,0,1,0,1,0,1,0,0,1,0,1,1,1,1,0,1,1,1,1,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,1,1,1,0,1,0,1,0,0,0,1,1,1,1,0,0,0,0,1,0,0,0,0,1,1,1,0,1,1,0,0,0,1,0,1,1,0,0,1,0,0,1,0,1,1,0,0,1,0,0,1,1,0,1,1,1,1,1,0,1,0,0,1,1,1,640,320,''],
[0,5,4,1,1,1,0,0,1,0,1,1,1,0,1,0,0,1,0,1,1,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,1,0,1,1,1,0,1,1,0,1,1,1,1,1,0,0,0,0,1,0,1,0,1,0,1,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1,0,0,0,1,0,0,640,320,''],
[1,0,0,0,0,1,0,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,361,175,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌŚ1Āʏ0ʑʓʐʕʒʖʔʗʚʙʜʘʞʛʖʍıʝʠʥʤʧʟʨʦʟʢĪʪʯʩʱʫʳʰʳʭģʵʹʲʺʴʻʡʷġʼ˂ʾʽ˅ʪˀˁ˄˃ˆˊˍʥˈĠˋ˒ˎ˓ʚːğ˕˙˔˛˗˘˜˚ˌˡʤ˝ĝˠ˦˟ʲˤĜ˧ˢ˨˭˪˫ˮˬ˳˰˱˯˴˷˄˵ę˸˽˜˻Ę˾˹̃ˣ̀Ė̂̈˺̆ĕ̉̄˲̋ė̍̒ʬ̐ē̖̘̓̎̃̏̂̕̚Ē̡̛̗̟̝̜˸̣Đ̢̥ˡ̨ď̪̗̭Ď̯̦̱̊ċ̳̫ˇ̶̷̴̹̻̼̽̾͂˕̀Ċ̸̍ͅĉ͇͉̽̅Ć͋̓ʿ͎ą̞͓͔͙̘͐͌͗͑͘͞ʼ͜Ą͕͚ʑ͡ăͣͦ͞Ă̧̙ͨͪͤͯͮ͟Ͱ͠Ͳ͚ͬͲͳͺʵ͹ͷ͂ͽʹ΁˅΀ͻ΂͍ͪ;ˬ΄Ή̜΋ΆΏ˖Ͷΐ̪Ύ΅ΖͥΒΗΓ͹ΛΚΑͮΌ̫ΕΡˋΣΝ͖ΠΧΐΜͧΪ΢άćΤ̵ΰδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϡϢϣϤϥϦϧϨϩϪϫϬϭϮϯϰϱϲϳϴϵ϶ϷϸϹϺϻϼϽϾϿЀЁЂЃЄЅІЇЈЉЊЋЌЍЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэȆ'],
[0,5,5,1,0,0,1,0,1,1,1,0,0,1,1,0,0,0,1,0,1,0,0,1,1,0,1,0,0,1,1,0,1,1,0,1,1,0,1,1,0,0,1,1,0,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1,0,0,1,1,1,1,0,1,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,1,0,1,1,0,1,1,0,0,1,0,0,0,1,1,1,1,0,0,640,320,''],
[0,5,5,1,0,0,1,0,0,0,1,0,0,1,0,1,1,1,1,0,1,0,1,0,0,1,0,0,0,1,0,1,0,1,0,1,1,1,0,1,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,0,1,0,1,1,0,0,0,1,1,0,1,1,0,0,0,0,0,0,1,1,1,0,1,0,0,1,0,0,1,1,0,0,1,0,1,1,1,0,1,1,0,0,0,0,1,0,1,640,320,''],
[1,0,0,1,1,1,1,1,1,0,0,0,1,0,1,0,0,0,0,0,1,0,282,140,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯƷ1ĀȲ0ȴȴȰŤȶȳȻȸȹȼȺȽţɀɀɁšɃȼɅŠɇȵɉɆȿɈɍŝɋȷɑŜɓɕŞɗɘɖɏɌɛśɚɟřɡɢŗɤɥŕɧɨœɪɫőɭɮŏɰɱōɳɴŋɶɷŉɹɺŇɼɽŅɿʀŃʂʃŁʅʆĿʈʉĽʋʌĻʎʏĹʑʒķʔʕĵʗʘĳʚʛıʝʞįʠʡĭʣʤīʦʧĩʩʪħʬʭĥʯʰģʲʳġʵʶğʸʹĝʻʼěʾʿęˁ˂ė˄˅ĕˇˈēˊˋđˍˎďːˑč˓˔ċ˖˗ĉ˙˚ć˜˝ą˟ˠăˢˣā˥˦ɞɋ˩ʨɝɔˬĨ˨˦˲ˣ˴ˠ˶˝˸˚˺˗˼˔˾ˑ̀ˎ̂ˋ̄ˈ̆˅̈˂̊ʿ̌˰̴̵̶̷̸̡̢̧̨̛̖̗̘̙̜̝̞̟̠̣̤̥̦̩̪̫̬̭̮̯̰̱̲̳̹̺̻̼͇͈͉͍͎̏̐̑̒̓̔̽̾̿̀́͂̓̈́͆͊͋͌̕̚ͅ͏͓͔͕͖͙͚͐͑͒͗͛ͣͤͥͦͧͨͩͪͫͬͭͮͯ͘͜͟͢͝͞͠͡ʕ'],
[0,6,4,1,1,0,0,0,1,1,1,0,1,1,0,0,0,1,1,0,1,0,1,0,0,1,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,0,1,1,1,0,0,0,1,1,0,0,0,1,640,320,''],
[0,6,6,1,1,0,0,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,0,0,1,1,0,1,0,1,1,1,0,0,1,1,1,0,1,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,0,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,1,1,0,1,0,0,1,1,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,1,1,0,1,1,0,1,0,1,0,0,1,0,0,1,1,0,1,1,1,0,0,1,0,0,0,0,1,0,0,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,0,1,1,1,1,1,640,320,''],
[1,0,0,1,0,0,0,0,0,1,1,0,1,0,0,0,0,1,1,1,1,0,482,234,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣʤʥʦʧʨʩʪʫʬʭʮʯʰʱʲʳʴʵʶʷʸʹʺʻʼʽʾʿˀˁ˂˃˄˅ˆˇˈˉˊˋˌˍˎˏːˑ˒˓˔˕˖˗˘˙˚˛˜˝˞˟ˠˡˢˣˤ˥˦˧˨˩˪˫ˬ˭ˮ˯˰˱˲˳˴˵˶˷˸˹˺˻˼˽˾˿̴̵̶̷̸̡̢̧̨̛̖̗̘̙̜̝̞̟̠̣̤̥̦̩̪̫̬̭̮̯̰̱̲̳̹̺̻̼̀́̂̃̄̅̆̇̈̉̊̋̌̍̎̏̐̑̒̓̔̽̾̿̀́͂̕̚ɕ1͇͈͉͍͎̓͆͊͋͌͏͓͔͕͖͙͚͐͑͒͗͛ͣͤͥͦͧͨͩͪͫͬͭͮͯ͘͜͟͢͝͞͠͡ͰͱͲͳʹ͵Ͷͷ͸͹ͺͻͼͽ;Ϳ΀΁΂΃΄΅Ά·ΈΉΊ΋Ό΍ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ΢ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϡϢϣϤϥϦϧϨϩϪϫϬϭϮϯϰϱϲϳϴϵ϶ϷϸϹϺϻϼϽϾϿЀЁЂЃЄЅІЇЈЉЊЋЌЍЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгде͍'],
[0,6,6,1,0,0,1,1,0,0,0,0,1,1,2,3,1,0,0,0,1,0,1,0,0,1,1,0,1,1,0,0,0,1,1,1,1,0,1,1,1,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,1,0,1,0,1,1,1,0,0,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,0,1,1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,1,0,0,1,1,0,0,1,1,1,0,1,0,1,1,0,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,1,1,1,1,0,1,0,0,1,0,1,0,0,0,0,640,320,''],
[1,0,0,1,1,0,0,0,1,1,1,0,1,0,0,0,0,0,1,1,0,0,469,233,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻŔ1ĀȾȼǅɀɀƩɃȿɇ0ɆɉɈɊɍɌɏɋɑɎɒɐɓɖɕɘɔɚɗɛəɜɟɞɡɝɣɠɤɢɥɨɧɪɦɬɩɭɫɮɱɰɳɯɵɲƭɷɹɴɺɶɻɾɽʀɼʂɿʃʁʄʇʆʉʅʋʈʌʀƯʎʑʍʓʊʔʒʕʘʗʚʖʜʙʝʛʞʘʐʟʤʡʠʧʥʨʦʩʬʫʮʪʰʭʣʯʭʱʴʷʶʹʵʻʸʼʺʽʉʳʿ˃ʾ˅ˀ˄ˇˆˈˋˊʥ˂ˍˉˑˌ˒ː˓˖˕˘˔ɬˏ˚˗˝˙˞ˡˠˣ˟˥ɼ˜ˢ˦ˤ˩ˬ˫ˮ˪˰ʪ˨˯˭˱˴˷˶˹˵˻ə˳˺˸˼˿̂́̄̀ˆ˾̅̃̆̊̌̉̎̋ɷ̘̗̈̐̓̍̔̏̕ɄƮ̢̧̡̖̞̙̟̝̠̣̩̦̪̂̒̚ʅ̴̨̥̫̰̯̲̬ɚ̵̸̷̮̳̱̻̺̹̼̽̽́͂̀ˤ͈̿̈́̓͊͌ͅʶ͇͉͍͓͋͐͒ʮ͏͕͙͔͚͑͘ɢ̛͗͛ͤ͜͢͠͝ɸͣͥͨͫͪ͡ɣͬͩ͟ͱͰͳ˹ͯͭͲͷʹ͸˵ͶͻͺͿ͹΁˓ͽ΀;΂΅Έ͖̜ΉΆ΍ΌΏΊͧ·ΓΎΔΐ˩΄ΖΚΕΜΗɫΙΝΛΞ΢ΤɥΠΣΡΩΨ͔ΧΥΫήΰΡέΪαίδ̈́γζκεμ̹ινληῥοςπχφ̢υσψόω͆΋ύϒϏϓʹϋϕϘϔϚ˙ϗϛϙώϠˀϝϡϞϥϤʈϣϟϪϦϫˎϑϬϰϧϭ͵ϯϲϱϳϷʿϩϹ϶ϽϸɐϻϾϼϿЄɊЁЅЂЉЄЇЃЍЊϔЌЏВЈϘБДЎЗόЖИМГΕЛОСЙΰРУНЦΐХЧЫТ͜ЪЭаШ΁ЯвЬеͬджкб̯ймпз͌ослф̼ухщр́шыюц̘эѐъѓτϵѕјєφђњяѝ˰ќўѢљːѡѤѧџˈѦѩѣѬϢїѮѱѭάѰѳѨѶ͑ѫѸѻѷʡѺѽѲҀʝѿҁ҅Ѽɮ҄҇Ҋ҂ɵ҉Ҍ҆ҏɴҎҐҔҋІѵґҙҕ̰ғҖҞҚƱқҢҟͼҘңҠҨΘҦҤҬҩѥҫҮұҧѪҰҳҭҶѯΒҸһҷʼҝҲҽѽҿҼӀѧӃӁӄжӇӅӉбӋӍӌТӏӈӔвӓӑӘӊҵӕӐӝ͞ӛәӜӢҍӠӞӡӧΦӥӣӦӬҡӫӯӨҒӪӱӴӭɑӗӶӹίӸӰӺϒӼӵӽλԀӾԅΉԄԂԁӿӳԆԊҸԈԎԉβԌԒԕұԐԍԙиԔԑԝԏԜԚԞѼԘԖԡЮԠԥԩҌԤԢԭ͸ԬԦԪθԨԮԲѣ԰ԶԵͭԸԺԱͤԼԾՁ̪ՀԹՂ̾ԴՆՉЊՄԽՅ̵ՌՊՍҜՈՎՒӚҺՕՑѮՐՙ՝ёՔՖ՞И՜աե̉դ՚բϐ՘զժӂՠթխЋհծձАմղնКոպչԃռյցԋլսօՋրվ։շքւֆУը֍֑ˑ֐֊͎֒ֈ֎֙ϖ֖֘֝Κ֚֔֕ҹƬ֥֡ϲ֦֠֞ʢֲ֢֪֭֮֜ͩ֨֩҃֬Կְִֵֶֺֽ͕˽ֱָׁԯ׀־ׂчֹׄ׉т׈׆׍ѹ׌ׅב˸ּ׊ג̶אוי̣ה׎ךө֌םס֋֤מץμלזׅרצתטע׬̋׫ׯ׳ɜײש׊׶װ׳׹״צ׼׷ס׿׺֡؂׽؆؅؀֎؈؃֒؋؆֪؎؉ւؑ،֢ؔ؏֞ؗؒ։ؚؕՑ؝ׁؘؠ؛Նأ؞ՕئءձةؤԹجاՒدت՞زحԺصذԍظسեػضӾؾعԉفؼԡلؿӰهقԊيمԖٍوӴًِӐَٓԝّٖӄٙٔӁٜٗӦٟٚҭ٢ٝӅ٥٠ӕ٨٣ԗ׮٬ٯӲנٰ٩כٮ٦ٳ҈ٶٴٸɿ٫ٷҋپٻ٤ٺټڂʏڄٿچ̑ڈڊډٹٲڎڑѠڌڅڕӮڍژ̗ځږկڐڙڒ΃ڔڠڣưڜڦүڞڧڟ˚ڛڤџڭګҁڰڪхڳڮрڶڱԷڢںڽҗکڷھʲڼڴ٦ڹۅсۇہ՗פۂێڡۀۏۋֳۑۈۖٱۍۗے֣ƫۚ۞ʔۊۛی۝ۓۢҾۄۥّۡ۟Д۫۩ևەۯۦˁۨ۳۪۵۬؀ۮ۶۰ۙ۲۹ٽ۸ۿؕۻ܀ϳ܅܃ճ۱ۼ܌ڏ۾܍܉˧܂ܐٗ܈ܔϬܖ܆ףۤܗܑ܁܋ܚܞڥܢܡӤܠܤܢܙܨЕܓܥֺܪܝϪܰܮΣܳܫδܱܶћܭܷ׸ܼܺךܹܴקܿ݃؄݅ܽ؁݈݀׻݋݆؍ݎ݉؊ݑ݌݇ܧݕ܉݂ݒԇݔݏؖݝݛݟݗݞڪݚݘ݄ݣݡݥݠݧսݦݤ֛ݩݭۥݯݪݱ܏ݰ݌ݵݳΤݻݹԧݲݿڒݾݶΓބݼ֯ݬނؽފޅإލވشސދنޓގخޖޑތށޗڽއޔ͋ޟޝԳޜޚڅޢަѴޥޠژިެнޙޯكޱޣُ޴ީط޷޲ٌ޺޵٘޽޸ـ߀޻ٕ߃޾١߆߁ى߉߄ٞߌ߇٪ߏߊْߒߍ٧ߕߐӘޮߙϊߘߓٛߞߖқߛߟՏߡߜҟߤߢіޫߨٴߪ߮էߧߥߗ߭ߴض߰߷̟߹߫՟߶߽ז߼߱ױ߳ࠀѶࠂߺٵ߿ࠃؼࠈࠆ̤ࠅࠌڲࠑࠉҐࠎࠒ˯ࠗࠕדࠔࠏگࠝ࠘ڝݸࠡާࠠࠛԫࠦࠞڸࠩࠤࠫࠋࠧࠁࠬ࠰яࠚࠪړ࠯࠶ؐ࠲࠹Ӓ࠻࠭ѐ࠵࠿Ҵ࠸ࡂֶࡁ࠳ϴࡄࡈܯ࠾ࡋӎࡍ࠼Ӗࡐࡅࡒࡊࡑݓࡖࡔࡘࠣࡎޞࡓ࡝Чࡇࡗ࡙ۧࡠؙ࡟ࡣۭࡨ࡚Ͼࡢ࡬֓࡫ࡦ֏ࡱࡩܘࡴ࡯ࡶࡥࡵծ࡮ࡲ֗ࡺࡸࡼࡷࡾ֧ࢃࡻܲࢆࢁ࢈ࢀࢄݢ࡜ࢇ؛ࡽ࢐۔࢏ࢊ࢑ࢉࢍϞ࢒࢖࢔ܜ࢓چ࢛࢙Ϯƪ࢟ٳɅɈɁǃڿࢩࢬࢭࢮࢯࢰࢱࢲࢳࢴࢵࢶࢷࢸࢹࢺࢻࢼࢽࢾࢿࣀࣁࣂࣃࣄࣅť'],
[0,6,6,1,1,0,0,0,1,1,0,1,1,0,0,1,1,1,0,1,1,1,0,0,0,0,1,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,1,0,0,1,0,0,1,1,0,0,0,1,0,0,1,0,1,0,0,1,1,0,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,0,1,1,1,1,0,0,1,0,0,1,0,0,0,1,0,0,0,0,1,1,0,1,1,0,0,0,1,1,0,1,0,1,0,0,1,0,1,0,1,1,0,1,1,0,1,1,0,1,0,0,0,0,1,0,0,0,0,640,320,''],
[0,7,3,1,1,0,1,0,1,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,1,0,0,1,1,0,1,1,1,1,0,1,1,1,0,0,1,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,1,1,0,1,0,0,0,1,1,1,1,0,0,0,1,1,0,0,0,1,1,0,1,640,320,''],
[1,0,0,1,1,0,1,0,0,0,0,0,1,1,1,0,0,0,1,1,0,0,481,233,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣʤʥʦʧʨʩʪʫʬʭʮʯʰʱʲʳʴʵʶʷʸʹʺʻʼʽʾʿˀˁ˂˃˄˅ˆˇˈˉˊˋˌˍˎˏːˑ˒˓˔˕˖˗˘˙˚˛˜˝˞˟ˠˡˢˣˤ˥˦˧˨˩˪˫ˬ˭ˮ˯˰˱˲˳˴˵˶˷˸˹˺˻˼˽˾˿̴̵̶̷̸̡̢̧̨̛̖̗̘̙̜̝̞̟̠̣̤̥̦̩̪̫̬̭̮̯̰̱̲̳̹̺̻̼̀́̂̃̄̅̆̇̈̉̊̋̌̍̎̏̐̑̒̓̔̽̕̚ʕ1͇͈͉͍͎̾́͂̓̈́͆͊͋͌ͅ͏͓͔͕͖͙͚͐͑͒͗͛ͣͤͥͦͧͨͩͪͫͬͭͮͯ͘͜͟͢͝͞͠͡ͰͱͲͳʹ͵Ͷͷ͸͹ͺͻͼͽ;Ϳ΀΁΂΃΄΅Ά·ΈΉΊ΋Ό΍ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ΢ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϡϢϣϤϥϦϧϨϩϪϫϬϭϮϯϰϱϲϳϴϵ϶ϷϸϹϺϻϼϽϾϿЀЁЂЃЄЅІЇЈЉЊЋЌЍЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгē'],
[0,7,3,1,0,0,1,1,0,0,0,1,0,1,0,0,1,0,0,0,1,1,0,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,0,0,1,0,0,1,0,1,1,0,0,0,1,1,0,1,1,0,1,1,1,1,1,0,1,0,1,0,0,0,0,0,1,1,1,0,1,0,0,0,0,1,0,1,1,1,0,0,0,0,640,320,''],
[0,9,2,1,0,0,1,0,0,0,1,1,0,1,1,1,0,1,1,1,0,0,0,0,0,1,0,0,0,1,1,0,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,0,0,0,0,1,1,0,0,1,1,1,0,0,0,0,1,1,0,640,320,''],
[1,0,0,0,0,1,0,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,235,117,'0ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍǚ1ĀȐ0ȒȎńȒȗȕłȒ2ĀȜȓȑȠșĽȞ3ȝȢņȥȧȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣʤʥʦʧʨʩƊ'],
]
let COLORS = [
"#100020", "#FF34FF", "#ffff00", "#dcba98", "#FF4A46", "#008941", "#006FA6", "#A30059", "#FFDBE5", "#7A4900", "#0000A6", "#63FFAC", "#B79762", "#884D43", "#8FB0FF", "#997D87", "#5A0007", "#809693", "#FEFFE6", "#1B4400", "#4FC601", "#3B5DFF", "#4A3B53", "#FF2F80", "#61615A", "#BA0900", "#6B7900", "#00C2A0", "#FFAA92", "#FF90C9", "#B903AA", "#D16100", "#DDEFFF", "#000035", "#7B4F4B", "#A1C299", "#aa9922", "#0AA6D8", "#013349", "#00846F", "#372101", "#FFB500", "#C2FFED", "#A079BF", "#CC0744", "#C0B9B2", "#C2FF99", "#001E09", "#00489C", "#6F0062", "#0CBD66", "#EEC3FF", "#456D75", "#B77B68", "#7A87A1", "#788D66", "#885578", "#FAD09F", "#FF8A9A", "#D157A0", "#BEC459", "#456648", "#0086ED", "#886F4C", "#34362D", "#B4A8BD", "#00A6AA", "#452C2C", "#636375", "#A3C8C9", "#FF913F", "#938A81", "#575329", "#00FECF", "#B05B6F", "#8CD0FF", "#3B9700", "#04F757", "#C8A1A1", "#1E6E00", "#7900D7", "#A77500", "#6367A9", "#A05837", "#6B002C", "#772600", "#D790FF", "#9B9700", "#549E79", "#FFF69F", "#201625", "#72418F", "#BC23FF", "#99ADC0", "#3A2465", "#922329", "#5B4534", "#FDE8DC", "#404E55", "#0089A3", "#CB7E98", "#A4E804", "#324E72", "#6A3A4C", "#83AB58", "#001C1E", "#D1F7CE", "#004B28", "#C8D0F6", "#A3A489", "#806C66", "#222800", "#BF5650", "#E83000", "#66796D", "#DA007C", "#FF1A59", "#8ADBB4", "#1E0200", "#5B4E51", "#C895C5", "#320033", "#FF6832", "#66E1D3", "#CFCDAC", "#D0AC94", "#7ED379", "#012C58", "#7A7BFF", "#D68E01", "#353339", "#78AFA1", "#FEB2C6", "#75797C", "#837393", "#943A4D", "#B5F4FF", "#D2DCD5", "#9556BD", "#6A714A", "#001325", "#02525F", "#0AA3F7", "#E98176", "#DBD5DD", "#5EBCD1", "#3D4F44", "#7E6405", "#02684E", "#962B75", "#8D8546", "#9695C5", "#E773CE", "#D86A78", "#3E89BE", "#CA834E", "#518A87", "#5B113C", "#55813B", "#E704C4", "#00005F", "#A97399", "#4B8160", "#59738A", "#FF5DA7", "#F7C9BF", "#643127", "#513A01", "#6B94AA", "#51A058", "#A45B02", "#1D1702", "#E20027", "#E7AB63", "#4C6001", "#9C6966", "#64547B", "#97979E", "#006A66", "#391406", "#F4D749", "#0045D2", "#006C31", "#DDB6D0", "#7C6571", "#9FB2A4", "#00D891", "#15A08A", "#BC65E9", "#FFFFFE", "#C6DC99", "#203B3C", "#671190", "#6B3A64", "#F5E1FF", "#FFA0F2", "#CCAA35", "#374527", "#8BB400", "#797868", "#C6005A", "#3B000A", "#C86240", "#29607C", "#402334", "#7D5A44", "#CCB87C", "#B88183", "#AA5199", "#B5D6C3", "#A38469", "#9F94F0", "#A74571", "#B894A6", "#71BB8C", "#00B433", "#789EC9", "#6D80BA", "#953F00", "#5EFF03", "#E4FFFC", "#1BE177", "#BCB1E5", "#76912F", "#003109", "#0060CD", "#D20096", "#895563", "#29201D", "#5B3213", "#A76F42", "#89412E", "#1A3A2A", "#494B5A", "#A88C85", "#F4ABAA", "#A3F3AB", "#00C6C8", "#EA8B66", "#958A9F", "#BDC9D2", "#9FA064", "#BE4700", "#658188", "#83A485", "#453C23", "#47675D", "#3A3F00", "#061203", "#DFFB71", "#868E7E", "#98D058", "#6C8F7D", "#D7BFC2", "#3C3E6E", "#D83D66", "#2F5D9B", "#6C5E46", "#D25B88", "#5B656C", "#00B57F", "#545C46", "#866097", "#365D25", "#252F99", "#00CCFF", "#674E60", "#FC009C", "#92896B"
]
