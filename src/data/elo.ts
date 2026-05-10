// International football Elo ratings — pulled from eloratings.net
// 1-year change is the rating delta over the trailing 365 days.
export interface EloTeam {
  rank: number;
  code: string;        // eloratings.net 2-letter code (NOT ISO 3166)
  name: string;
  rating: number;
  ch1y: number;        // 1-year rating change (positive = improving)
  matches: number;
}

export const ELO_SNAPSHOT_DATE = 'Friday May 1 2026';
export const ELO_SOURCE_URL = 'https://www.eloratings.net/';

// Raw TSV — kept as a string so the file stays grep-friendly and refreshes are
// just a paste. Columns: rank, code, name, rating, ch1y, matches.
const ELO_TSV = `1\tES\tSpain\t2165\t+15\t780
2\tAR\tArgentina\t2113\t-28\t1109
3\tFR\tFrance\t2082\t+51\t938
4\tEN\tEngland\t2020\t+9\t1161
5\tBR\tBrazil\t1984\t-9\t1065
5\tPT\tPortugal\t1984\t-4\t694
7\tCO\tColombia\t1975\t+24\t648
8\tNL\tNetherlands\t1961\t-5\t901
9\tEC\tEcuador\t1933\t+22\t598
10\tHR\tCroatia\t1930\t+19\t398
11\tDE\tGermany\t1923\t-64\t1045
12\tNO\tNorway\t1912\t+83\t886
13\tJP\tJapan\t1904\t+28\t835
14\tTR\tTurkey\t1902\t+65\t669
15\tUY\tUruguay\t1892\t-29\t1019
16\tCH\tSwitzerland\t1889\t+77\t895
17\tSN\tSenegal\t1878\t+119\t704
18\tDK\tDenmark\t1870\t+8\t903
19\tBE\tBelgium\t1866\t+22\t876
20\tMX\tMexico\t1858\t+41\t1027
21\tIT\tItaly\t1856\t-58\t902
22\tPY\tParaguay\t1833\t+33\t788
23\tAT\tAustria\t1827\t-10\t865
24\tMA\tMorocco\t1821\t+15\t727
25\tCA\tCanada\t1784\t+6\t485
26\tAU\tAustralia\t1783\t+46\t635
27\tRU\tRussia\t1776\t-15\t812
28\tRS\tSerbia\t1770\t-74\t860
29\tSQ\tScotland\t1767\t+25\t866
29\tUA\tUkraine\t1767\t-42\t338
31\tIR\tIran\t1760\t-70\t668
32\tKR\tSouth Korea\t1752\t+6\t1050
32\tNG\tNigeria\t1752\t+194\t713
32\tGR\tGreece\t1752\t-77\t656
35\tDZ\tAlgeria\t1743\t+35\t688
36\tPA\tPanama\t1737\t+14\t591
37\tPL\tPoland\t1729\t+25\t919
38\tUZ\tUzbekistan\t1727\t+30\t365
38\tVE\tVenezuela\t1727\t-15\t481
40\tCZ\tCzechia\t1726\t-29\t882
41\tUS\tUnited States\t1721\t-1\t825
41\tKO\tKosovo\t1721\t+122\t107
43\tSE\tSweden\t1719\t-17\t1118
44\tCL\tChile\t1710\t-12\t852
45\tHU\tHungary\t1703\t-12\t1033
46\tWA\tWales\t1698\t-38\t733
47\tPE\tPeru\t1695\t-29\t708
48\tSI\tSlovenia\t1694\t-50\t319
49\tIE\tIreland\t1691\t+57\t740
50\tJO\tJordan\t1690\t+57\t582
51\tEG\tEgypt\t1689\t+23\t883
52\tCI\tIvory Coast\t1676\t+85\t692
53\tSK\tSlovakia\t1673\t-11\t366
54\tCD\tDR Congo\t1655\t+89\t547
55\tGE\tGeorgia\t1653\t-63\t319
56\tAL\tAlbania\t1646\t+13\t408
57\tBO\tBolivia\t1645\t-6\t536
58\tTN\tTunisia\t1636\t+25\t775
59\tIL\tIsrael\t1634\t+38\t523
60\tRO\tRomania\t1627\t-58\t800
61\tCM\tCameroon\t1614\t+26\t661
62\tCR\tCosta Rica\t1613\t-39\t789
63\tIQ\tIraq\t1607\t+68\t759
64\tEI\tNorthern Ireland\t1601\t+44\t610
65\tML\tMali\t1596\t-16\t624
66\tBA\tBosnia and Herzegovina\t1594\t+68\t279
67\tNM\tNorth Macedonia\t1589\t-24\t303
68\tNZ\tNew Zealand\t1585\t-10\t439
69\tHN\tHonduras\t1571\t+11\t667
69\tIS\tIceland\t1571\t+40\t525
71\tSA\tSaudi Arabia\t1568\t+6\t835
72\tCV\tCape Verde\t1549\t+45\t251
73\tAO\tAngola\t1543\t+8\t473
74\tFI\tFinland\t1542\t+2\t823
75\tAE\tUnited Arab Emirates\t1540\t-1\t674
76\tJM\tJamaica\t1535\t-24\t716
77\tHT\tHaiti\t1532\t-21\t561
78\tBF\tBurkina Faso\t1530\t+31\t491
79\tZA\tSouth Africa\t1524\t-74\t524
80\tGT\tGuatemala\t1515\t+20\t626
81\tBY\tBelarus\t1513\t+22\t306
82\tGH\tGhana\t1505\t+43\t777
83\tSY\tSyria\t1491\t+51\t596
84\tOM\tOman\t1490\t-48\t591
85\tBG\tBulgaria\t1475\t+15\t779
86\tGN\tGuinea\t1470\t+20\t645
86\tPS\tPalestine\t1470\t+43\t289
88\tNS\tNorthern Cyprus\t1457\t0\t17
89\tME\tMontenegro\t1440\t-88\t172
90\tCW\tCuraçao\t1436\t+113\t498
90\tLU\tLuxembourg\t1436\t-22\t473
92\tKZ\tKazakhstan\t1430\t+5\t270
92\tSR\tSuriname\t1430\t+30\t543
94\tBJ\tBenin\t1429\t+21\t352
95\tQA\tQatar\t1425\t-73\t697
96\tKD\tKurdistan\t1424\t0\t4
97\tCN\tChina\t1423\t+21\t762
97\tGM\tGambia\t1423\t+50\t298
99\tLY\tLibya\t1420\t+35\t459
100\tBH\tBahrain\t1418\t-82\t636
101\tGA\tGabon\t1401\t-65\t462
102\tUG\tUganda\t1394\t+5\t734
103\tNE\tNiger\t1393\t+71\t290
104\tTT\tTrinidad and Tobago\t1392\t-39\t870
105\tGQ\tEquatorial Guinea\t1390\t-100\t195
106\tMG\tMadagascar\t1382\t+84\t356
106\tFO\tFaroe Islands\t1382\t+111\t281
108\tAM\tArmenia\t1379\t-7\t281
109\tTH\tThailand\t1376\t-7\t933
110\tKP\tNorth Korea\t1375\t-6\t417
111\tMZ\tMozambique\t1372\t-91\t442
112\tZM\tZambia\t1371\t-35\t879
112\tZW\tZimbabwe\t1371\t-23\t551
114\tKM\tComoros\t1362\t-51\t158
115\tTG\tTogo\t1358\t-12\t493
116\tKE\tKenya\t1356\t-22\t779
117\tVN\tVietnam\t1351\t-8\t526
118\tSD\tSudan\t1350\t-46\t553
119\tSL\tSierra Leone\t1348\t+23\t336
120\tRE\tReunion\t1345\t0\t139
121\tSV\tEl Salvador\t1341\t-48\t685
122\tAZ\tAzerbaijan\t1340\t-28\t322
123\tEE\tEstonia\t1339\t-52\t539
124\tGP\tGuadeloupe\t1338\t-38\t293
125\tRW\tRwanda\t1336\t+14\t290
126\tLB\tLebanon\t1333\t-10\t420
127\tID\tIndonesia\t1331\t-11\t783
128\tKW\tKuwait\t1328\t+5\t761
129\tNI\tNicaragua\t1327\t+5\t251
130\tZN\tZanzibar\t1321\t0\t216
131\tTZ\tTanzania\t1313\t-91\t655
132\tMQ\tMartinique\t1311\t-61\t371
132\tMR\tMauritania\t1311\t-35\t298
134\tNA\tNamibia\t1303\t-49\t304
135\tLV\tLatvia\t1301\t+11\t457
135\tCY\tCyprus\t1301\t+4\t427
137\tLR\tLiberia\t1297\t+34\t340
138\tMY\tMalaysia\t1293\t+33\t929
139\tGY\tGuyana\t1292\t+24\t456
140\tLT\tLithuania\t1291\t0\t416
140\tKG\tKyrgyzstan\t1291\t-31\t190
142\tBI\tBurundi\t1286\t+5\t240
142\tNC\tNew Caledonia\t1286\t+1\t285
144\tTJ\tTajikistan\t1285\t-4\t210
144\tET\tEthiopia\t1285\t+6\t472
146\tDO\tDominican Republic\t1284\t-6\t189
147\tBW\tBotswana\t1267\t-79\t368
148\tMD\tMoldova\t1262\t-60\t300
149\tGW\tGuinea-Bissau\t1248\t-34\t215
150\tMW\tMalawi\t1241\t-38\t698
151\tCU\tCuba\t1239\t-8\t483
152\tCF\tCentral African Republic\t1237\t-28\t162
152\tMT\tMalta\t1237\t-18\t454
154\tGF\tFrench Guiana\t1223\t0\t190
155\tYT\tMayotte\t1216\t0\t41
156\tTM\tTurkmenistan\t1209\t-6\t187
157\tCG\tCongo\t1207\t-16\t474
158\tLS\tLesotho\t1205\t-32\t352
159\tER\tEritrea\t1201\t+62\t86
160\tTI\tTahiti\t1176\t0\t254
161\tPH\tPhilippines\t1167\t+37\t397
162\tYE\tYemen\t1151\t+42\t294
163\tSW\tEswatini\t1149\t-75\t324
164\tVC\tSaint Vincent and the Grenadines\t1141\t+8\t365
165\tIN\tIndia\t1138\t-24\t608
165\tPR\tPuerto Rico\t1138\t+21\t195
167\tSG\tSingapore\t1137\t+78\t771
168\tPG\tPapua New Guinea\t1135\t+31\t165
169\tHK\tHong Kong\t1120\t-18\t511
170\tBM\tBermuda\t1118\t-11\t235
171\tVU\tVanuatu\t1114\t+69\t225
172\tSS\tSouth Sudan\t1109\t-24\t81
173\tFJ\tFiji\t1108\t-119\t286
174\tGD\tGrenada\t1099\t+27\t309
175\tAD\tAndorra\t1077\t+11\t228
176\tMU\tMauritius\t1073\t+29\t359
176\tTD\tChad\t1073\t-76\t182
176\tBZ\tBelize\t1073\t-15\t129
179\tSB\tSolomon Islands\t1054\t-72\t223
180\tMF\tSaint Martin\t1042\t+24\t86
181\tST\tSao Tome and Principe\t1035\t-3\t82
182\tKN\tSaint Kitts and Nevis\t1029\t-74\t252
183\tAF\tAfghanistan\t1011\t-50\t165
184\tJS\tSomaliland\t1005\t0\t2
185\tLC\tSaint Lucia\t1003\t-31\t264
186\tGI\tGibraltar\t1002\t-50\t116
187\tEH\tWestern Sahara\t996\t0\t1
188\tMM\tMyanmar\t982\t+40\t552
189\tAW\tAruba\t979\t+66\t207
189\tSO\tSomalia\t979\t+68\t150
191\tSX\tSint Maarten\t975\t+43\t75
192\tMS\tMontserrat\t971\t+21\t74
193\tGL\tGreenland\t946\t0\t22
194\tDJ\tDjibouti\t940\t+11\t121
195\tDM\tDominica\t934\t-43\t246
196\tBD\tBangladesh\t932\t+10\t326
197\tLI\tLiechtenstein\t904\t-2\t257
198\tMC\tMonaco\t903\t0\t9
199\tBB\tBarbados\t898\t-52\t375
200\tAG\tAntigua and Barbuda\t894\t-23\t285
201\tNP\tNepal\t893\t-55\t295
202\tSC\tSeychelles\t853\t+2\t190
203\tMV\tMaldives\t848\t-29\t239
204\tKH\tCambodia\t844\t+7\t316
205\tSM\tSan Marino\t836\t-9\t226
205\tBQ\tBonaire\t836\t+1\t103
207\tLK\tSri Lanka\t827\t+90\t284
208\tTW\tTaiwan\t821\t-93\t339
209\tPK\tPakistan\t812\t-12\t284
210\tKY\tCayman Islands\t805\t-23\t128
211\tHG\tChagos Islands\t782\t0\t4
212\tTV\tTuvalu\t756\t0\t34
213\tEU\tSint Eustatius\t737\t0\t11
214\tLA\tLaos\t734\t+47\t235
215\tMN\tMongolia\t730\t0\t100
216\tWS\tSamoa\t728\t0\t77
217\tVG\tBritish Virgin Islands\t727\t+105\t137
218\tBL\tSaint Barthelemy\t725\t0\t10
219\tGU\tGuam\t718\t+5\t130
220\tWF\tWallis and Futuna\t699\t0\t24
221\tVA\tVatican\t692\t0\t5
222\tAB\tSaba\t691\t0\t8
223\tBS\tBahamas\t685\t-107\t90
224\tPM\tSaint Pierre and Miquelon\t677\t0\t7
225\tTL\tEast Timor\t673\t+15\t90
226\tTC\tTurks and Caicos Islands\t657\t+9\t56
227\tAI\tAnguilla\t646\t+21\t117
228\tBT\tBhutan\t636\t-1\t115
229\tBN\tBrunei\t632\t-32\t151
230\tTE\tTibet\t629\t0\t10
231\tVI\tUS Virgin Islands\t627\t+41\t81
232\tCK\tCook Islands\t622\t0\t56
233\tMO\tMacao\t588\t-10\t161
234\tCX\tChristmas Island\t578\t0\t10
235\tFK\tFalkland Islands\t571\t0\t4
236\tFM\tFS Micronesia\t563\t0\t8
237\tMH\tMarshall Islands\t559\t0\t2
238\tKI\tKiribati\t544\t0\t11
239\tTO\tTonga\t520\t0\t70
240\tNU\tNiue\t496\t0\t2
241\tMP\tNorthern Mariana Islands\t432\t0\t36
242\tCC\tCocos Islands\t422\t0\t10
243\tPW\tPalau\t402\t0\t2
244\tAS\tEastern Samoa\t369\t-19\t59`;

export const ELO_TEAMS: EloTeam[] = ELO_TSV.split('\n').map((line) => {
  const [rank, code, name, rating, ch1y, matches] = line.split('\t');
  const ch = ch1y === '-' ? 0 : parseInt(ch1y, 10);
  return {
    rank: parseInt(rank, 10),
    code,
    name,
    rating: parseInt(rating, 10),
    ch1y: Number.isNaN(ch) ? 0 : ch,
    matches: parseInt(matches, 10),
  };
});

// Confederation lookup by eloratings code. Used to filter the table.
// Coverage focuses on top-100 teams; smaller territories default to OTHER.
export const CONFEDERATION: Record<string, 'UEFA' | 'CONMEBOL' | 'CONCACAF' | 'CAF' | 'AFC' | 'OFC' | 'OTHER'> = {
  // CONMEBOL (10)
  AR: 'CONMEBOL', BO: 'CONMEBOL', BR: 'CONMEBOL', CL: 'CONMEBOL', CO: 'CONMEBOL',
  EC: 'CONMEBOL', PY: 'CONMEBOL', PE: 'CONMEBOL', UY: 'CONMEBOL', VE: 'CONMEBOL',
  // CONCACAF (selected)
  US: 'CONCACAF', CA: 'CONCACAF', MX: 'CONCACAF', CR: 'CONCACAF', PA: 'CONCACAF',
  HN: 'CONCACAF', JM: 'CONCACAF', SV: 'CONCACAF', GT: 'CONCACAF', HT: 'CONCACAF',
  TT: 'CONCACAF', CW: 'CONCACAF', SR: 'CONCACAF', GY: 'CONCACAF', NI: 'CONCACAF',
  DO: 'CONCACAF', CU: 'CONCACAF', PR: 'CONCACAF', BZ: 'CONCACAF', BM: 'CONCACAF',
  GD: 'CONCACAF', GP: 'CONCACAF', MQ: 'CONCACAF', AG: 'CONCACAF', BB: 'CONCACAF',
  BS: 'CONCACAF', AI: 'CONCACAF', VC: 'CONCACAF', LC: 'CONCACAF', DM: 'CONCACAF',
  KN: 'CONCACAF', KY: 'CONCACAF', MS: 'CONCACAF', SX: 'CONCACAF', MF: 'CONCACAF',
  AW: 'CONCACAF', BQ: 'CONCACAF', VI: 'CONCACAF', VG: 'CONCACAF', TC: 'CONCACAF',
  GF: 'CONCACAF',
  // UEFA (selected — most active in qualifying)
  ES: 'UEFA', FR: 'UEFA', EN: 'UEFA', PT: 'UEFA', NL: 'UEFA', HR: 'UEFA', DE: 'UEFA',
  NO: 'UEFA', TR: 'UEFA', CH: 'UEFA', DK: 'UEFA', BE: 'UEFA', IT: 'UEFA', AT: 'UEFA',
  RU: 'UEFA', RS: 'UEFA', SQ: 'UEFA', UA: 'UEFA', GR: 'UEFA', PL: 'UEFA', KO: 'UEFA',
  CZ: 'UEFA', SE: 'UEFA', HU: 'UEFA', WA: 'UEFA', SI: 'UEFA', IE: 'UEFA', SK: 'UEFA',
  GE: 'UEFA', AL: 'UEFA', RO: 'UEFA', IL: 'UEFA', EI: 'UEFA', BA: 'UEFA', NM: 'UEFA',
  IS: 'UEFA', FI: 'UEFA', BY: 'UEFA', BG: 'UEFA', NS: 'UEFA', ME: 'UEFA', LU: 'UEFA',
  KZ: 'UEFA', AZ: 'UEFA', EE: 'UEFA', LV: 'UEFA', LT: 'UEFA', MD: 'UEFA', AM: 'UEFA',
  CY: 'UEFA', MT: 'UEFA', FO: 'UEFA', AD: 'UEFA', LI: 'UEFA', SM: 'UEFA', GI: 'UEFA',
  MC: 'UEFA',
  // AFC (selected)
  JP: 'AFC', UZ: 'AFC', IR: 'AFC', KR: 'AFC', JO: 'AFC', AE: 'AFC', SA: 'AFC',
  IQ: 'AFC', QA: 'AFC', BH: 'AFC', SY: 'AFC', OM: 'AFC', PS: 'AFC', LB: 'AFC',
  KW: 'AFC', AU: 'AFC', CN: 'AFC', TH: 'AFC', VN: 'AFC', KP: 'AFC', ID: 'AFC',
  KG: 'AFC', TJ: 'AFC', TM: 'AFC', YE: 'AFC', MY: 'AFC', PH: 'AFC', IN: 'AFC',
  HK: 'AFC', SG: 'AFC', AF: 'AFC', BD: 'AFC', NP: 'AFC', MV: 'AFC', KH: 'AFC',
  TW: 'AFC', PK: 'AFC', LA: 'AFC', MN: 'AFC', GU: 'AFC', BT: 'AFC', BN: 'AFC',
  MO: 'AFC', TL: 'AFC',
  // CAF (selected)
  SN: 'CAF', MA: 'CAF', NG: 'CAF', DZ: 'CAF', EG: 'CAF', CI: 'CAF', CD: 'CAF',
  TN: 'CAF', CM: 'CAF', ML: 'CAF', CV: 'CAF', AO: 'CAF', BF: 'CAF', ZA: 'CAF',
  GH: 'CAF', GN: 'CAF', LY: 'CAF', GA: 'CAF', UG: 'CAF', NE: 'CAF', GQ: 'CAF',
  MG: 'CAF', MZ: 'CAF', ZM: 'CAF', ZW: 'CAF', KM: 'CAF', TG: 'CAF', KE: 'CAF',
  SD: 'CAF', SL: 'CAF', RE: 'CAF', RW: 'CAF', BJ: 'CAF', GM: 'CAF', NA: 'CAF',
  LR: 'CAF', BI: 'CAF', ET: 'CAF', BW: 'CAF', GW: 'CAF', MW: 'CAF', CF: 'CAF',
  YT: 'CAF', CG: 'CAF', LS: 'CAF', ER: 'CAF', SW: 'CAF', TZ: 'CAF', ZN: 'CAF',
  MR: 'CAF', JS: 'CAF', EH: 'CAF', SO: 'CAF', DJ: 'CAF', SC: 'CAF', MU: 'CAF',
  TD: 'CAF', ST: 'CAF', SS: 'CAF',
  // OFC (selected)
  NZ: 'OFC', NC: 'OFC', PG: 'OFC', VU: 'OFC', FJ: 'OFC', SB: 'OFC', TI: 'OFC',
  WS: 'OFC', TO: 'OFC', CK: 'OFC', NU: 'OFC', AS: 'OFC', WF: 'OFC',
};
