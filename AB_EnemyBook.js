// =============================================================================
// AB_EnemyBook.js
// Version: 1.24
// -----------------------------------------------------------------------------
// [Homepage]: ヱビのノート
//             http://www.zf.em-net.ne.jp/~ebi-games/
// =============================================================================



/*:
 * @plugindesc v1.24 戦闘中も確認できるモンスター図鑑です。属性、ステートの耐性の確認もできます。
 * @author ヱビ
 * 
 * @param ShowCommandInBattle
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc バトル中に敵の情報コマンドを表示するかどうかを決めます。
 * プラグインコマンドで変更することもできます。0:非表示、1:表示
 * @default 1
 * 
 * @param ShowAllBookCommandInBattle
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc バトル中に図鑑コマンドを表示するかどうかを決めます。
 * プラグインコマンドで変更することもできます。0:非表示、1:表示
 * @default 1
 * 
 * @param ResisterTiming
 * @type select
 * @option 登録されない
 * @value 0
 * @option 戦闘開始時
 * @value 1
 * @option 戦闘終了時
 * @value 2
 * @desc 図鑑に登録されるタイミングです。
 * 0:登録されない、1:戦闘開始時、2:戦闘終了時
 * @default 2
 * 
 * @param ShowCurrentStatus
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc ONにすると、図鑑で敵の現在の情報（現在HPなど）が見られます。
 * プラグインコマンドで変更することもできます。0:OFF、1:ON
 * @default 0
 * 
 * @param HideUnknownStatusInSkill
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc ONにすると、敵の情報をスキルで見た時も、登録されていない敵は「？？？」と表示されます。0:OFF、1:ON
 * @default 0
 * 
 * @param ShowGeneralStatusInSkill
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc ONにすると、敵の情報をスキルで見た時も、現在ＨＰではなく一般的なデータが表示されます。0:OFF、1:ON
 * @default 0
 * 
 * @param HideItemUntilGet
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc アイテムをゲットするまで表示しないようにします。0:OFF、1:ON
 * @default 0
 * 
 * @param ---用語、アイコン---
 * @default 
 * 
 * @param EnemyBookCommandName
 * @desc バトル中の敵の情報を見るコマンドの名前です。
 * @default 敵の情報
 * 
 * @param EnemyBookAllCommandName
 * @desc バトル中、通常通り図鑑を開くコマンドの名前です。
 * @default 図鑑
 * 
 * @param Achievement
 * @desc 達成率の名前です。
 * @default 達成率
 * 
 * @param UnknownEnemy
 * @desc 未確認の敵キャラの索引名です。
 * @default ？？？？？？
 * 
 * @param UnknownData
 * @desc まだ図鑑に登録されていない敵キャラの各データの内容です。
 * @default ？？？
 * 
 * @param WeakElementName
 * @desc 効きやすい属性の名前です。
 * @default 弱点属性
 * 
 * @param ResistElementName
 * @desc 効きにくい属性の名前です。
 * @default 耐性属性
 * 
 * @param WeakStateName
 * @desc 効きやすいステートの名前です。
 * @default 弱点ステート
 * 
 * @param ResistStateName
 * @desc 効きにくいステートの名前です。無効ステートも含みます。
 * @default 耐性ステート
 * 
 * @param NoEffectStateName
 * @desc 効かないステートの名前です。
 * @default 無効ステート
 * 
 * @param DefeatNumberName
 * @desc 敵を倒した数の名前です。
 * @default 倒した数
 * 
 * @param UnknownDropItemIcon
 * @type number
 * @min 0
 * @desc 未知の敵キャラの落とすアイテムのアイコンの番号です。
 * デフォルト：16
 * @default 16
 * 
 * @param AddEnemySkillMessage
 * @desc スキルで敵キャラを図鑑に登録することに成功したときの
 * メッセージです。%1が敵キャラの名前に置き換えられます。
 * @default %1を図鑑に登録した！
 * 
 * @param FailToAddEnemySkillMessage
 * @desc スキルで敵キャラを図鑑に登録することに失敗したときの
 * メッセージです。%1が敵キャラの名前に置き換えられます。
 * @default %1は図鑑には載せられない！

 * @param MissToAddEnemySkillMessage
 * @desc スキルで敵キャラを図鑑に登録することに失敗したときの
 * メッセージです。%1が敵キャラの名前に置き換えられます。
 * @default %1を図鑑に登録するのに失敗した！
 * 
 * @param FailToCheckEnemySkillMessage
 * @desc スキルで敵キャラの情報を見ることに失敗したときの
 * メッセージです。%1が敵キャラの名前に置き換えられます。
 * @default %1の情報はわからなかった！
 * 
 * @param ---表示項目---
 * @default 
 * 
 * @param DispNo
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に番号を表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispLv
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑にレベルを表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispDefeatNumber
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑にその敵を倒した数を表示するか決めます。
 * 0:非表示、1:表示
 * @default 1
 * 
 * @param DispHP
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑にHPを表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispMP
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑にMPを表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispATK
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に攻撃力を表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispDEF
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に防御力を表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispMAT
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に魔法力を表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispMDF
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に魔法防御を表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispAGI
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に敏捷性を表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispLUK
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に運を表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispDropItems
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑にドロップアイテムを表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispWeakElement
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に効きやすい属性を表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispResistElement
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に効きにくい属性を表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispWeakState
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に効きやすいステートを表示するか決めます。
 * 0:非表示、1:表示
 * @default 1
 * 
 * @param DispResistState
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に効きにくいステートを表示するか決めます。（無効含む）
 * 0:非表示、1:表示
 * @default 1
 * 
 * @param DispNoEffectState
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に効かないステートを表示するか決めます。
 * 0:非表示、1:表示
 * @default 0
 * 
 * @param DispDescribe
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に敵キャラの説明を表示するか決めます。
 * 0:非表示、1:表示
 * @default 1
 * 
 * @param ---属性アイコン---
 * @default 
 * 
 * @param UseElementIconInPluginParameter
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc 属性の中のアイコンではなく、下のパラメータを使いますか？
 * 0:OFF、1:ON
 * @default 1
 * 
 * @param ElementIcons
 * @desc 属性のアイコンです。1番から順番に半角スペースで区切って並
 * べてください。
 * @default 76 64 65 66 67 68 69 70 71
 * 
 * @help
 * ============================================================================
 * 概要
 * ============================================================================
 * 
 * RPGツクールデフォルトでついてくる、Yoji Ojima 様のプラグイン「EnemyBook.js」
 * の改変プラグイン
 * 
 * 〇できること
 * 
 * ・モンスター図鑑を開ける
 * ・EnemyBook.jsではなかった項目も見られる
 * ・戦闘中に図鑑を見られるコマンドを追加可能
 * ・敵の情報を見るチェックスキルを作れる
 * 
 * 〇表示できるもの（★はEnemyBook.jsにはなかった項目）
 * 
 * ・敵の名前
 * ・敵のイラスト
 * ★敵の番号
 * ★レベル（メモ欄で設定）
 * ★その敵を倒した数
 * ・HP、MP、攻撃力、防御力、魔法力、魔法防御、敏捷性、運
 * ・ドロップアイテム
 * ★効きやすい属性、効きにくい属性
 * ★効きやすいステート、効きにくい（無効含む）ステート、効かないステート
 * ・説明文（メモ欄で設定、2行）
 * ★図鑑の達成率
 * 
 * ============================================================================
 * 4つの使い方
 * ============================================================================
 * 
 * １．図鑑
 * 表示：図鑑に登録されているすべての敵のリスト
 * 操作：アイテムを使ったり、人に話しかけたり、戦闘中に「図鑑」コマンド
 * 
 * ２．バトル中の敵のステータス一覧
 * 表示：バトル中の敵のリスト。HPゲージなど、現在のステータス
 * 操作：戦闘中に「敵の情報」コマンド。現在の情報を見る設定がONになっているとき
 * 
 * ３．バトル中の敵の図鑑の情報
 * 表示：バトル中の敵のリスト。現在のステータスではなく、図鑑の情報
 * 操作：戦闘中に「敵の情報」コマンド。現在の情報を見る設定がOFFになっているとき
 * 
 * ４．チェック
 * 表示：チェックした敵の現在のステータス
 * 操作：チェックスキルを敵に対して使用
 * 
 * ５．チェック（一般データ） - v1.24
 * 表示：チェックした敵の一般データ
 * 操作：チェックスキルを敵に対して使用。
 *       ShowGeneralStatusInSkillがＯＮになっているとき。
 * 
 * ============================================================================
 * とりあえずの導入方法
 * ============================================================================
 * 
 * このプラグインをプラグインマネージャーで読み込んで、
 * 図鑑を表示するイベントにプラグインコマンド「EnemyBook open」を加えるだけ！
 * 
 * データベースの敵キャラは、名前が空白でなければ図鑑に登録されていきます。
 * （名前があっても図鑑に登録したくない敵キャラには、設定が必要です）
 * 
 * ただ、そのままでは表示する項目が多すぎて表示しきれていないので、プラグイン
 * パラメータで表示する項目を削りましょう。
 * 
 * ============================================================================
 * その他
 * ============================================================================
 * 
 * 〇属性の表示方法、2通り
 * 
 * 1.属性の名前の中にアイコンを入れる
 *   例：\i[64]炎
 * 
 * 2.プラグインパラメータを使う - v1.04
 *   UseElementIconInPluginParameterをONにし、
 *   ElementIconsに属性アイコンの番号を半角スペースで区切って並べてください。
 *   例：76 64 65 66 67 68 69 70 71
 * 
 * 〇未確認の敵キャラ「？？？」
 * 
 * まだ図鑑に登録されていない敵との戦闘中に図鑑を開くと、データが「？？？」と
 * 表示されます。「？？？」の部分はプラグインパラメータの UnknownDataで設定
 * できます。 
 * 
 * 〇現在の情報を見る設定・敵の情報コマンド
 * 
 * デフォルトでは敵の情報コマンドでは、一般的な敵のデータが出るようになっていま
 * す。
 * プラグインパラメータShowCurrentStatus を ON にすると、
 * 戦闘中に敵の情報を開いたとき、現在の敵キャラのパラメータが表示されます。
 * 現在HPだけでなく、攻撃力や属性有効度の変化も表示されます。
 * 現在の情報を見る設定は、プラグインコマンドで変更できます。
 * 
 * 〇現在の情報を見る設定・チェックスキル - v1.24
 * 
 * デフォルトではチェックスキルでは現在の敵のデータが出るようになっています。
 * プラグインパラメータShowGeneralStatusInSkillをＯＮにすると、スキルでチェック
 * したときも、一般的な敵のデータを表示するようにできます。
 * 
 * 〇図鑑に登録されるタイミング
 * 
 * プラグインパラメータ ResisterTiming で、図鑑に登録されるタイミングを設定でき
 * ます。
 * 
 * 0: 登録されない
 * 1: 戦闘開始時
 * 2: 戦闘終了時
 * 
 * 〇ゲットしていないアイテムを？？？にする - v1.22
 * プラグインパラメータHideItemUntilGetをONにすると、ゲットしていないアイテムを
 * ？？？と表示します。
 * 
 * ============================================================================
 * プラグインコマンド
 * ============================================================================
 * 
 * 〇EnemyBook.jsと同じコマンド
 * 
 * EnemyBook open 
 *   図鑑画面を開きます。
 * EnemyBook add 3
 *   敵キャラ３番を図鑑に追加します。
 * EnemyBook remove 4
 *   敵キャラ４番を図鑑から削除します。
 * EnemyBook complete
 *   図鑑を完成させます。
 * EnemyBook clear
 *   図鑑をクリアします。
 * 
 * 〇その他のプラグインコマンド
 * 
 * EnemyBook showInBattle
 *   戦闘中に「敵の情報」を開くことができるようにします。
 * EnemyBook hideInBattle
 *   戦闘中に「敵の情報」を開くことができないようにします。
 * EnemyBook showCurrentStatus
 *   戦闘中に「敵の情報」を開くと、現在の敵のパラメータを見られるようにします。
 * EnemyBook showGeneralStatus
 *   戦闘中に「敵の情報」を開くと、その敵の一般的な情報を見られるようにします。
 * 
 * 〇v1.06
 * 
 * EnemyBook getAchievement per 12
 *   図鑑の達成率（％）を変数12番に入れます。
 * EnemyBook getAchievement num 14
 *   図鑑の登録数を変数14番に入れます。
 * EnemyBook isRegistered 5 96
 *   敵キャラ5番が図鑑に登録されているかどうかをスイッチ96番に入れます。
 * EnemyBook getDefeatNumber 3 24
 *   敵キャラ3番を倒した数を変数24に入れます。
 * 
 * 〇v1.16
 * EnemyBook openEnemy 16
 *   ID16の敵キャラの画面を開きます。
 * 
 * 〇v1.17
 * EnemyBook showAllInBattle
 *   戦闘中に「図鑑」を開くことができるようにします。
 * EnemyBook hideAllInBattle
 *   戦闘中に「図鑑」を開くことができないようにします。
 * 
 * 〇v1.20
 * EnemyBook clearDefeatNumber
 *   倒した数をリセットします。
 * 
 * 〇v1.22
 * EnemyBook clearEnemyDrop
 *   エネミードロップを入手したかどうかをリセットします。
 * 
 * ============================================================================
 * 敵キャラのメモ欄
 * ============================================================================
 * 
 * 〇EnemyBook.jsと同じタグ
 * 
 * <desc1:なんとか>
 *   説明１行目です。
 * <desc2:かんとか>
 *   説明２行目です。
 * <book:no>
 *   これを設定した敵キャラは図鑑に載りません。
 * 
 * 〇その他のタグ
 * 
 * <bookLevel:3>
 *   図鑑に強さの目安となるレベルを記載します。
 *   何も書かなければ、何も表示されません。
 * 
 * <bookCanCheck>
 *   Version 1.04で追加しました。
 *   <book:no>を書いた敵でもこのタグを付ければ<checkEnemyStatus>のスキルで
 *   チェックできます。
 * 
 * ============================================================================
 * スキルのメモ欄
 * ============================================================================
 * 
 * <addToEnemyBook>
 *   対象を図鑑に登録します。
 *   対象が図鑑に載る敵キャラだった場合は成功メッセージが、
 *   そうでなかった場合失敗メッセージが表示されます。
 * 
 * <checkEnemyStatus>
 *   対象の情報を見ます。
 *   対象が図鑑に載る敵キャラだった場合図鑑が表示され、
 *   そうでなかった場合失敗メッセージが表示されます。
 *   このスキルでは、対象の現在のパラメータ（現在HPなど）が表示されます。
 *   〇v1.21
 *   プラグインパラメータHideUnknownStatusInSkillで「？？？」と表示することも
 *   できるようになりました。
 * 
 * この2つのスキルのメッセージはプラグインパラメータで設定できます。
 * 
 * ============================================================================
 * ステートのメモ欄
 * ============================================================================
 * 
 * <book:no>
 *   このステートを図鑑に表示しないようにできます。
 * 
 * ============================================================================
 * 更新履歴
 * ============================================================================
 * 
 * Version 1.24
 *   HideUnknownStatusInSkillをＯＮにしていても、図鑑に登録されていない敵をスキ
 *   ルでチェックした時に属性とステートは表示されていましたが、？？？と表示する
 *   ように修正しました。
 *   スキルでチェックした時も、現在のパラメータではなく一般的なパラメータを表示
 *   できるプラグインパラメータShowGeneralStatusInSkillを追加しました。
 * 
 * Version 1.23
 *   未登録のモンスターをチェックしようとするとエラーが発生してしまう不具合を修
 *   正しました。
 * 
 * Version 1.22
 *   ドロップしていないアイテムを？？？と表示する機能を追加しました。
 *   ドロップアイテムを入手したかどうかをリセットするプラグインコマンドを追加し
 *   ました。
 * 
 * Version 1.21
 *   スキルで図鑑に登録するとき、スキルの成功率を参照するようにしました。
 *   スキルで図鑑を見るときも、初めて会った敵は？？？と表示されるように設定でき
 *   るようにしました。
 * 
 * Version 1.20
 *   倒した数をリセットするプラグインコマンドを追加しました。
 * 
 * Version 1.19
 *   YEPのプラグインを使わずに図鑑を開いたとき、変数Importedが見つからないとい
 *   うエラーが出る不具合を直しました。
 * 
 * Version 1.18
 *   戦闘中に「図鑑」コマンドで開いたとき、まだ図鑑に登録されておらず、索引名が
 *   ？？？？？になるはずの敵キャラの名前が表示されてしまっていた不具合を直しま
 *   した。
 * 
 * Version 1.17
 *   ヘルプを見やすくしました。
 *   戦闘中に図鑑のすべての敵キャラの情報を見られるコマンド「図鑑」を追加しまし
 *   た。そのため、プラグインパラメータ２つとプラグインコマンド２つを追加しまし
 *   た。
 *   戦闘中にアイテムなどで図鑑を開いたとき、戦闘中の敵ではなく、図鑑全体を開く
 *   ようにしました。そのとき、シーンを挿入するのではなくバトルシーン上のウィン
 *   ドウを使うようにしました。これにより戦闘中に図鑑を開いてもターンがリセット
 *   されるバグを回避できます。
 * 
 * Version 1.16
 *   プラグインコマンドで、指定したIDの敵キャラの画面を開けるようにしました。
 * 
 * Version 1.15
 *   YEP_X_AnimatedSVEnemiesを入れていないときエラーが発生してプレイが中断され
 *   てしまう不具合を直しました。
 * 
 * Version 1.14
 *   YEP_X_AnimatedSVEnemiesを入れてもアニメーションしていなかった不具合を直し
 *   ました。残っていたコンソールログを削除しました。
 * 
 * Version 1.13
 *   YEP_X_AnimatedSVEnemiesを使っている場合、アニメーションするようにしまし
 *   た。また、YEP_X_AnimatedSVEnemiesを使っている場合でも、1回目でも表示される
 *   ようにしました。
 * 
 * Version 1.12
 *   図鑑を開いたとき、1回目だけ敵キャラのスプライトがはみ出してしまう不具合を
 *   修正しました。
 * 
 * Version 1.11
 *   図鑑を開いたとき、1回目は敵キャラのスプライトが表示されず、2回目にカーソル
 *   を合わせたときに初めて表示される不具合を修正しました。
 *   （YEP_X_AnimatedSVEnemiesを使っている場合、SVエネミーを表示するためにこの
 *   　不具合は修正していません）
 * 
 * Version 1.10
 *   ツクールのデータベースの用語で、HPやMPに「体力」などの日本語を使ったとき、
 *   文字が重なってしまうバグを修正しました。
 * 
 * Version 1.09
 *   プラグインパラメータShowCurrentStatusの設定が反映されないバグを修正しまし
 *   た。
 * 
 * Version 1.08
 *   YEP_X_AnimatedSVEnemies.jsを使っているとき、アクターが表示されるようにしま
 *   した。
 * 
 * Version 1.07
 *   プラグインパラメータDispLvでレベルを表示するかどうか選べるようにし、倒した
 *   数をレベルの次に表示するようにしました。
 * 
 * Version 1.06
 *   プラグインコマンドを4種追加しました。図鑑の達成率、登録数、敵キャラが登録さ
 *   れているかどうか、敵キャラを何体倒したかの4種を取得できます。
 * 
 * Version 1.05
 *   図鑑に敵を倒した数を表示できるようにしました。
 * 
 * Version 1.04
 *   属性の中にアイコンを書けない時のため、プラグインパラメータで属性のアイコン
 *   を設定できるようにしました。
 *   <book:no>が設定されている敵キャラでも、<bookCanCheck>が設定されていれば
 *   スキルでならチェックできるようにしました。
 * 
 * Version 1.03
 *   モンスターの番号を表示できるようにしました。
 *   達成率を表示するようにしました。
 *   無効化ステートの項目をONにしているとき、耐性ステートには無効化ステートは
 *   表示されないようにしました。
 *  
 * Version 1.02
 *   無効ステートの項目を追加しました。
 *   耐性の項目が奇数のとき、図鑑説明がかぶってしまう不具合を修正しました。
 * 
 * Version 1.01
 *   表示項目によって余白を削り、ウィンドウの高さを小さくするようにしました。
 *   高さを計算するために、説明を表示するかどうかを設定するプラグインパラメータ
 *   DispDescribe を追加しました。
 *   また、対象の情報を見るスキルを使ったとき、敵を選択するウィンドウを
 *   非表示にするようにしました。
 * 
 * Version 1.00
 *   初版
 * 
 * ============================================================================
 * 利用規約
 * ============================================================================
 * 
 * ・クレジット表記は不要
 * ・営利目的で使用可
 *     ただし、素材そのものの販売は禁止です。
 * ・改変可
 * ・素材だけの再配布も可
 * ・アダルトゲーム、残酷なゲームでの使用も可
 * ・ツクール素材の改変素材です
 *     ツクール公式の利用規約をご覧ください。
 *     https://tkool.jp/support/guideline
 */


(function() {
	var parameters = PluginManager.parameters('AB_EnemyBook');
	var EnemyBookCommandName = (parameters['EnemyBookCommandName'] || "敵の情報");
	var ShowCommandInBattle = (parameters['ShowCommandInBattle'] == 1) ? true : false;
	var EnemyBookAllCommandName = (parameters['EnemyBookAllCommandName'] || "図鑑");
	var ShowAllBookCommandInBattle = (parameters['ShowAllBookCommandInBattle'] == 1) ? true : false;
	var ResisterTiming = Number(parameters['ResisterTiming']);
	var Achievement = String(parameters['Achievement'] || "");
	var UnknownEnemy = String(parameters['UnknownEnemy'] || "");
	var UnknownData = String(parameters['UnknownData'] || "");
	var HideUnknownStatusInSkill = (parameters['HideUnknownStatusInSkill'] == 1) ? true : false;
	var HideItemUntilGet = (parameters['HideItemUntilGet'] == 1) ? true : false;
	var ShowCommandInBattle = (parameters['ShowCommandInBattle'] == 1) ? true : false;
	var ShowGeneralStatusInSkill = (parameters['ShowGeneralStatusInSkill'] == 1) ? true : false;
	var AddEnemySkillMessage = String(parameters['AddEnemySkillMessage'] || "");
	var FailToAddEnemySkillMessage = String(parameters['FailToAddEnemySkillMessage'] || "");
	var MissToAddEnemySkillMessage = String(parameters['MissToAddEnemySkillMessage'] || "");
	var FailToCheckEnemySkillMessage = String(parameters['FailToCheckEnemySkillMessage'] || "");
	var DispNo = (parameters['DispNo'] == 1) ? true : false;
	var DispLv = (parameters['DispLv'] == 1) ? true : false;
	var ShowCurrentStatus = (parameters['ShowCurrentStatus'] == 1) ? true : false;
	var DispDescribe = (parameters['DispDescribe'] == 1) ? true : false;

	var DispDefeatNumber = (parameters['DispDefeatNumber'] == 1) ? true : false;

	var UseElementIconInPluginParameter = (parameters['UseElementIconInPluginParameter'] == 1) ? true : false;
	var dispParameters = [];
	dispParameters[0] = (parameters['DispHP'] == 1) ? true : false;
	dispParameters[1] = (parameters['DispMP'] == 1) ? true : false;
	dispParameters[2] = (parameters['DispATK'] == 1) ? true : false;
	dispParameters[3] = (parameters['DispDEF'] == 1) ? true : false;
	dispParameters[4] = (parameters['DispMAT'] == 1) ? true : false;
	dispParameters[5] = (parameters['DispMDF'] == 1) ? true : false;
	dispParameters[6] = (parameters['DispAGI'] == 1) ? true : false;
	dispParameters[7] = (parameters['DispLUK'] == 1) ? true : false;
	var DispDropItems = (parameters['DispDropItems'] == 1) ? true : false;
	var dispRates = [];
	dispRates[1] = (parameters['DispResistElement'] == 1) ? true : false;
	var ResistElementName = String(parameters['ResistElementName'] || "耐性属性");
	dispRates[0] = (parameters['DispWeakElement'] == 1) ? true : false;
	var WeakElementName = String(parameters['WeakElementName'] || "弱点属性");
	dispRates[3] = (parameters['DispResistState'] == 1) ? true : false;
	var ResistStateName = String(parameters['ResistStateName'] || "耐性ステート");
	dispRates[2] = (parameters['DispWeakState'] == 1) ? true : false;
	var WeakStateName = String(parameters['WeakStateName'] || "弱点ステート");
	dispRates[4] = (parameters['DispNoEffectState'] == 1) ? true : false;
	var NoEffectStateName = String(parameters['NoEffectStateName'] || "無効ステート");
	var UnknownDropItemIcon = Number(parameters['UnknownDropItemIcon']);
	if (UnknownDropItemIcon === Number.NaN) UnknownDropItemIcon = 0;
	var DefeatNumberName = String(parameters['DefeatNumberName'] || "倒した数");
	var ElementIcons = (parameters['ElementIcons']).split(" ");
	var a = [0];
	ElementIcons = a.concat(ElementIcons);

	if (typeof(Imported) === "undefined") Imported = {};


//=============================================================================
// Game_System
//=============================================================================

	var Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'EnemyBook') {
			switch(args[0]) {
			case 'open':
				// v1.17
				if ($gameParty.inBattle()) {
					SceneManager._scene.allBattleEnemyBook();
				} else {
					SceneManager.push(Scene_EnemyBook);
				}
				break;
			case 'add':
				$gameSystem.addToEnemyBook(Number(args[1]));
				break;
			case 'remove':
				$gameSystem.removeFromEnemyBook(Number(args[1]));
				break;
			case 'complete':
				$gameSystem.completeEnemyBook();
				break;
			case 'clear':
				$gameSystem.clearEnemyBook();
				break;
			case 'showInBattle':
				$gameSystem.setShowBattleEnemyBook(true);
				break;
			case 'hideInBattle':
				$gameSystem.setShowBattleEnemyBook(false);
				break;
			case 'showCurrentStatus':
				$gameSystem.setShowCurrentEnemysStatus(true);
				break;
			case 'showGeneralStatus':
				$gameSystem.setShowCurrentEnemysStatus(false);
				break;
			case 'getAchievement':
				$gameSystem.getAchievement(args[1], Number(args[2]));
				break;
			case 'isRegistered':
				$gameSystem.isRegistered(Number(args[1]), Number(args[2]));
				break;
			case 'getDefeatNumber':
				$gameSystem.getDefeatNumber(Number(args[1]), Number(args[2]));
				break;
			// v1.16
			case 'openEnemy':
				$gameTemp.ABEnemyBookId = Number(args[1]);
				SceneManager.push(Scene_EnemyBook);
				break;
			//v1.17
			case 'showAllInBattle':
				$gameSystem.setShowBattleAllEnemyBook(true);
				break;
			case 'hideAllInBattle':
				$gameSystem.setShowBattleAllEnemyBook(false);
				break;
			case 'clearDefeatNumber':
				$gameSystem.clearDefeatNumber();
				break;
			// 1.22
			case 'clearEnemyDrop':
				$gameSystem.clearEnemyDropGot();
				break;
			}
		}
	};
	
	var Game_System_prototype_initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function() {
		Game_System_prototype_initialize.call(this);
		this.initEnemyBookSettings();
	};

	Game_System.prototype.initEnemyBookSettings = function() {
		this._showBattleEnemyBook = ShowCommandInBattle;
		this._showAllBookCommandInBattle = ShowAllBookCommandInBattle;
		this._showCurrentEnemyStatus = ShowCurrentStatus;
	};

	Game_System.prototype.setShowBattleEnemyBook = function(value) {
		this._showBattleEnemyBook = value;
	};
	Game_System.prototype.isShowBattleEnemyBook = function() {
		if (this._showBattleEnemyBook === undefined) this.initEnemyBookSettings();
		return this._showBattleEnemyBook;
	};

	Game_System.prototype.setShowBattleAllEnemyBook = function(value) {
		this._showAllBookCommandInBattle = value;
	};
	Game_System.prototype.isShowBattleAllEnemyBook = function() {
		if (this._showAllBookCommandInBattle === undefined) this.initEnemyBookSettings();
		return this._showAllBookCommandInBattle;
	};

	Game_System.prototype.setShowCurrentEnemysStatus = function(value) {
		this._showCurrentEnemyStatus = value;
	};
	Game_System.prototype.isShowCurrentEnemysStatus = function() {
		if (this._showCurrentEnemyStatus === undefined) this.initEnemyBookSettings();
		return this._showCurrentEnemyStatus;
	};

	Game_System.prototype.clearEnemyBook = function() {
		this._enemyBookFlags = [];
	};

	Game_System.prototype.addToEnemyBook = function(enemyId) {
		if (!this._enemyBookFlags) {
			this.clearEnemyBook();
		}
		this._enemyBookFlags[enemyId] = true;
	};

	
	Game_System.prototype.removeFromEnemyBook = function(enemyId) {
		if (this._enemyBookFlags) {
			this._enemyBookFlags[enemyId] = false;
		}
	};

	Game_System.prototype.completeEnemyBook = function() {
		this.clearEnemyBook();
		for (var i = 1; i < $dataEnemies.length; i++) {
			this._enemyBookFlags[i] = true;
		}
	};
	
	
	Game_System.prototype.isInEnemyBook = function(enemy) {
		if (this._enemyBookFlags && enemy) {
				return !!this._enemyBookFlags[enemy.id];
		} else {
			return false;
		}
	};

	Game_System.prototype.clearDefeatNumber = function() {
		this._defeatNumbers = [];
	};

	Game_System.prototype.incrementDefeatNumber = function(id) {
		if (!this._defeatNumbers) {
			this.clearDefeatNumber();
		}
		if (!this._defeatNumbers[id]) {
			this._defeatNumbers[id] = 0;
		}
		this._defeatNumbers[id]++;
	};

	Game_System.prototype.defeatNumber = function(id) {
		if (!this._defeatNumbers) {
			this.clearDefeatNumber();
		}
		if (!this._defeatNumbers[id]) {
			this._defeatNumbers[id] = 0;
		}
		return this._defeatNumbers[id];
	};

	Game_System.prototype.getRegisterNumber = function() {
		var a=0;
		for (var i=1; i<$dataEnemies.length; i++) {
			var enemy = $dataEnemies[i];
			if (enemy.name && enemy.meta.book !== 'no') {
				if (this.isInEnemyBook(enemy)) a++;
			}
		}
		return a;
	};

	Game_System.prototype.getRegisterPercent = function() {
		var a=0;
		var b=0;
		for (var i=1; i<$dataEnemies.length; i++) {
			var enemy = $dataEnemies[i];
			if (enemy.name && enemy.meta.book !== 'no') {
				if (this.isInEnemyBook(enemy)) a++;
				b++;
			}
		}
		return Math.floor(a*100/b);
	};

	Game_System.prototype.getAchievement = function(type, vId) {
		if (type == 'per' || type == 'percent') {
			var num = this.getRegisterPercent();
			$gameVariables.setValue(vId, num);
		} else if (type == 'num' || type == 'number') {
			var num = this.getRegisterNumber();
			$gameVariables.setValue(vId, num);
		}
	};

	Game_System.prototype.isRegistered = function(eId, sId) {
		var enemy = $dataEnemies[eId];
		if (this.isInEnemyBook(enemy)) {
			$gameSwitches.setValue(sId, true);
		} else {
			$gameSwitches.setValue(sId, false);
		}
	};

	Game_System.prototype.getDefeatNumber = function(eId, vId) {
		var num = this.defeatNumber(eId);
		$gameVariables.setValue(vId, num);
	};

	Game_System.prototype.clearEnemyDropGot = function() {
		this._enemyDropGot = [];
	};

	Game_System.prototype.setEnemyDropGot = function(eId, iId, value) {
		if (!this._enemyDropGot) {
			this._enemyDropGot = [];
		}
		if (!this._enemyDropGot[eId]) {
			this._enemyDropGot[eId] = [];
		}
		this._enemyDropGot[eId][iId] = value;
	};

	Game_System.prototype.getEnemyDropGot = function(eId, iId) {
		if (!HideItemUntilGet) return true;
		if (!this._enemyDropGot) {
			this._enemyDropGot = [];
			return false;
		}
		if (!this._enemyDropGot[eId]) {
			return false;
		}
		if (!this._enemyDropGot[eId][iId]) {
			return false;
		}
		return true;
	};


//=============================================================================
// 戦闘開始時に登録
//=============================================================================
	if (ResisterTiming === 1) {
		var _Game_Troop_setup = Game_Troop.prototype.setup;
		Game_Troop.prototype.setup = function(troopId) {
			_Game_Troop_setup.call(this, troopId);
			this.members().forEach(function(enemy) {
				if (enemy.isAppeared()) {
					$gameSystem.addToEnemyBook(enemy.enemyId());
				}
			}, this);
		};
		
		var _Game_Enemy_appear = Game_Enemy.prototype.appear;
		Game_Enemy.prototype.appear = function() {
			_Game_Enemy_appear.call(this);
			$gameSystem.addToEnemyBook(this._enemyId);
		};
		
		var _Game_Enemy_transform = Game_Enemy.prototype.transform;
			Game_Enemy.prototype.transform = function(enemyId) {
			_Game_Enemy_transform.call(this, enemyId);
			$gameSystem.addToEnemyBook(enemyId);
		};
//=============================================================================
// 戦闘終了時に登録
//=============================================================================
	} else if (ResisterTiming === 2) {
		
		var _Game_Troop_setup = Game_Troop.prototype.setup;
		Game_Troop.prototype.setup = function(troopId) {
			_Game_Troop_setup.call(this, troopId);
			this._appearedMembers = [];
			this.members().forEach(function(enemy) {
				if (enemy.isAppeared()) {
					this._appearedMembers.push(enemy.enemyId());
				}
			}, this);
		};
		
		var _Game_Enemy_appear = Game_Enemy.prototype.appear;
		Game_Enemy.prototype.appear = function() {
			_Game_Enemy_appear.call(this);
			this.friendsUnit()._appearedMembers.push(this._enemyId);
		};
		
		var _Game_Enemy_transform = Game_Enemy.prototype.transform;
			Game_Enemy.prototype.transform = function(enemyId) {
			_Game_Enemy_transform.call(this, enemyId);
			this.friendsUnit()._appearedMembers.push(this._enemyId);
		};

		var Game_Troop_prototype_onBattleEnd = 
			(Game_Troop.prototype.onBattleEnd || Game_Unit.prototype.onBattleEnd);
		Game_Troop.prototype.onBattleEnd = function() {
			Game_Troop_prototype_onBattleEnd.call(this);
			for (var i=0,l=this._appearedMembers.length; i<l; i++) {
				$gameSystem.addToEnemyBook(this._appearedMembers[i]);
			}
		};
	}

//=============================================================================
// Window_PartyCommand
//=============================================================================

	var Window_PartyCommand_prototype_makeCommandList = 
		Window_PartyCommand.prototype.makeCommandList;
	Window_PartyCommand.prototype.makeCommandList = function() {
		Window_PartyCommand_prototype_makeCommandList.call(this);
		this.addEnemyBookCommand();
		this.addAllEnemyBookCommand();
	}

	Window_PartyCommand.prototype.addEnemyBookCommand = function() {
		if (!$gameSystem.isShowBattleEnemyBook()) return;
		var index = this.findSymbol('escape');
		var obj = {name:EnemyBookCommandName, symbol:'enemybook', enabled:true};
		//this.addCommandAt(index, EnemyBookCommandName, 'enemybook', true);
		this._list.splice(index, 0, obj);
		
	};
	// v1.17
	Window_PartyCommand.prototype.addAllEnemyBookCommand = function() {
		if (!$gameSystem.isShowBattleAllEnemyBook()) return;
		var index = this.findSymbol('escape');
		var obj = {name:EnemyBookAllCommandName, symbol:'allenemybook', enabled:true};
		this._list.splice(index, 0, obj);
	};


//=============================================================================
// Scene_Battle
//=============================================================================
	var Scene_Battle_prototype_createAllWindows = 
		Scene_Battle.prototype.createAllWindows;
	Scene_Battle.prototype.createAllWindows = function() {
		Scene_Battle_prototype_createAllWindows.call(this);
		this.createEnemyBookWindows();
	};

	Scene_Battle.prototype.createEnemyBookWindows = function() {
		this._enemyBookIndexWindow = new Window_EnemyBookIndex(0, 0);
		this._enemyBookIndexWindow.setHandler('cancel', this.endBattleEnemyBook.bind(this));
		this._enemyBookIndexWindow.deselect();

		var wx = this._enemyBookIndexWindow.width;
		var ww = Graphics.boxWidth - wx;
		var wh = Scene_EnemyBook.prototype.calcStatusWindowHeight();
		this._enemyBookStatusWindow = new Window_EnemyBookStatus(wx, 0, ww, wh);

		this._enemyBookIndexWindow.hide();
		this._enemyBookStatusWindow.hide();


		this.addWindow(this._enemyBookIndexWindow);
		this.addWindow(this._enemyBookStatusWindow);

		this._enemyBookIndexWindow.setStatusWindow(this._enemyBookStatusWindow);
	};
	
	var Scene_Battle_prototype_isAnyInputWindowActive = 
		Scene_Battle.prototype.isAnyInputWindowActive;
	Scene_Battle.prototype.isAnyInputWindowActive = function() {
		if (Scene_Battle_prototype_isAnyInputWindowActive.call(this)) return true;
		return this._enemyBookIndexWindow.active;
	};

	var Scene_Battle_prototype_createPartyCommandWindow = 
		Scene_Battle.prototype.createPartyCommandWindow;
	Scene_Battle.prototype.createPartyCommandWindow = function() {
		Scene_Battle_prototype_createPartyCommandWindow.call(this);
		var win = this._partyCommandWindow;
		win.setHandler('enemybook', this.battleEnemyBook.bind(this));
		win.setHandler('allenemybook', this.allBattleEnemyBook.bind(this));
	};

	Scene_Battle.prototype.battleEnemyBook = function() {
		// v1.17
		this._enemyBookStatusWindow.isAllEnemies = false;
		this._enemyBookIndexWindow.isAllEnemies = false;
		this._enemyBookStatusWindow.setup();
		this._enemyBookIndexWindow.setup();
	};
// v1.17
	Scene_Battle.prototype.allBattleEnemyBook = function() {
		this._enemyBookStatusWindow.isAllEnemies = true;
		this._enemyBookIndexWindow.isAllEnemies = true;
		this._enemyBookStatusWindow.setup();
		this._enemyBookIndexWindow.setup();
	};

	// v1.17deselectをcloseの後に移動
	// これが呼ばれた後に
	// Window_EnemyBookIndex.processCancelが呼ばれる？
	Scene_Battle.prototype.endBattleEnemyBook = function() {
		this._enemyBookIndexWindow.close();
		this._enemyBookStatusWindow.close();
		this._enemyBookIndexWindow.deselect();
		//this.startPartyCommandSelection();
	};

//=============================================================================
// Scene_EnemyBook
//=============================================================================

	Scene_EnemyBook = function() {
		this.initialize.apply(this, arguments);
	}
	Scene_EnemyBook.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_EnemyBook.prototype.constructor = Scene_EnemyBook;
	
	Scene_EnemyBook.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);
	};

	Scene_EnemyBook.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		this._percentWindow = new Window_EnemyBookPercent(0, 0);
		var wy = this._percentWindow.height;
		this._indexWindow = new Window_EnemyBookIndex(0, wy);
		this._indexWindow.setHandler('cancel', this.popScene.bind(this));
		var wx = this._indexWindow.width;
		var ww = Graphics.boxWidth - wx;
		var wh = this.calcStatusWindowHeight();
		this._statusWindow = new Window_EnemyBookStatus(wx, 0, ww, wh);
		this.addWindow(this._percentWindow);
		this.addWindow(this._indexWindow);
		this.addWindow(this._statusWindow);
		// Xv1.16 （セットアップって自動で呼ばれたような？）
		this._indexWindow.isAllEnemies = true;
		this._statusWindow.isAllEnemies = true;
		this._indexWindow.setup();
		this._indexWindow.setStatusWindow(this._statusWindow);
		this._indexWindow.setPercentWindow(this._percentWindow);
	};

	Scene_EnemyBook.prototype.calcStatusWindowHeight = function() {
		var lineHeight = Window_Base.prototype.lineHeight();
		var textPadding = Window_Base.prototype.textPadding();
		var standardPadding = Window_Base.prototype.standardPadding();
		var paramHeight = Scene_EnemyBook.prototype.calcParameterHeight();
		var height = paramHeight + standardPadding * 2;
		var linePlus = 0;
		for (var i = 0; i < 5; i++) {
			if (dispRates[i]) {
				linePlus += 0.5;
			}
		}
		linePlus = Math.ceil(linePlus) * 2;

		if (DispDescribe) {
			linePlus += 2;
		}
		height += linePlus * lineHeight + textPadding * Math.ceil(linePlus / 2);
		return height;
	};

	Scene_EnemyBook.prototype.calcParameterHeight = function() {
		var lineHeight = Window_Base.prototype.lineHeight();
		var textPadding = Window_Base.prototype.textPadding();
		var standardPadding = Window_Base.prototype.standardPadding();
		var height = 0;
		var linePlus = 0;
		for (var i = 0; i < 8; i++) {
			if (dispParameters[i]) {
				linePlus++;
			}
		}
		if (DispDefeatNumber) linePlus++;
		if (DispLv) linePlus++;
		linePlus = Math.max(linePlus, DispDropItems ? 9 : 6);
		height = lineHeight * linePlus + textPadding * 2;

		return height;
	};


//=============================================================================
// Window_EnemyBookPercent
//=============================================================================

	Window_EnemyBookPercent = function() {
		this.initialize.apply(this, arguments);
	};

	Window_EnemyBookPercent.prototype = Object.create(Window_Base.prototype);
	Window_EnemyBookPercent.prototype.constructor = Window_EnemyBookPercent;

	Window_EnemyBookPercent.prototype.initialize = function(x, y, width, height) {
		var width = Math.floor(Graphics.boxWidth / 3);
		var height = this.fittingHeight(1);
		Window_Base.prototype.initialize.call(this, x, y, width, height);
		this.max = 0;
		this.achievement = 0;
	};

	Window_EnemyBookPercent.prototype.setup = function() {
		this.show();
		this.open();
	};

	Window_EnemyBookPercent.prototype.setAchievement = function(max, achievement) {
		this.max = max;
		this.achievement = achievement;
		this.refresh();
	}

	Window_EnemyBookPercent.prototype.refresh = function() {
		if (this.max === 0) return;
		var w1 = this.contentsWidth()/2;
		this.drawText(Achievement, 0, 0, w1);
		this.drawText(Math.floor(this.achievement / this.max * 100) + "%", w1, 0, w1, 'right');
	}

//=============================================================================
// Window_EnemyBookIndex
//=============================================================================
	Window_EnemyBookIndex = function() {
		this.initialize.apply(this, arguments);
	}
	Window_EnemyBookIndex.prototype = Object.create(Window_Selectable.prototype);
	Window_EnemyBookIndex.prototype.constructor = Window_EnemyBookIndex;

	Window_EnemyBookIndex.lastIndex  = 0;

	Window_EnemyBookIndex.prototype.initialize = function(x, y) {
		var width = Math.floor(Graphics.boxWidth / 3);
		var height = Graphics.boxHeight - y;
		Window_Selectable.prototype.initialize.call(this, x, y, width, height);
		//this.refresh();
		// v1.17
		this.isAllEnemies = false;
		this.enemy = null;
	}

	Window_EnemyBookIndex.prototype.setup = function() {
		this.refresh();
				// v1.17
		// setupがいつ呼ばれるかによっては図鑑を開いたときでも
		// 初期カーソルが0になってしまう恐れ
		if (!this.isAllEnemies) {
			this.select(0);
		// ver1.16
		} else if ($gameTemp.ABEnemyBookId){
			var no = 0;
			var id = $gameTemp.ABEnemyBookId;
			$gameTemp.ABEnemyBookId = null;
			this._list.some(function(enemy, i){
				if (id === enemy.enemyId()) {
					no = i;
					return true;
				}
				return false;
			});
			this.select(no);
		} else {
			this.select(Window_EnemyBookIndex.lastIndex);
		}
		this.show();
		this.activate();
		this.open();
	};

	Window_EnemyBookIndex.prototype.setupWhenCheck = function() {
		this.refresh();
				// v1.17
		// setupWhenCheckがいつ呼ばれるかによっては図鑑を開いたときでも
		// 初期カーソルが0になってしまう恐れ
		// ただsetupWhenCheckはチェックスキルのときだけ使われるので平気だった
		if (!this.isAllEnemies) {
			this.select(0);
		} else {
			this.select(Window_EnemyBookIndex.lastIndex);
		}
		this.openness = 255;
		this.hide();
		this.activate();
	};

	Window_EnemyBookIndex.prototype.maxCols = function() {
		return 1;
	};

	Window_EnemyBookIndex.prototype.maxItems = function() {
		return this._list ? this._list.length : 0;
	};

	Window_EnemyBookIndex.prototype.setPercentWindow = function(percentWindow) {
		this._percentWindow = percentWindow;
		this.updatePercent();
	};

	Window_EnemyBookIndex.prototype.setStatusWindow = function(statusWindow) {
		this._statusWindow = statusWindow;
		this.updateStatus();
	};

	Window_EnemyBookIndex.prototype.update = function() {
		Window_Selectable.prototype.update.call(this);
		this.updateStatus();
	};

	Window_EnemyBookIndex.prototype.updatePercent = function() {
		if (this._percentWindow && this._list) {
			var a = $gameSystem.getRegisterNumber();
			this._percentWindow.setAchievement(this._list.length, a);
		}
	}

	Window_EnemyBookIndex.prototype.updateStatus = function() {
		if (this._statusWindow && this._list) {
			var enemy = this._list[this.index()];
			this._statusWindow.setEnemy(enemy);
		}
	};

	Window_EnemyBookIndex.prototype.refresh = function() {
		this._list = [];
		if (this.enemy) {
			this._list.push(this.enemy);
				// v1.17
		} else if (!this.isAllEnemies && $gameSystem.isShowCurrentEnemysStatus()) {
			var enemies = $gameTroop.aliveMembers();
			for (var i=0,l=enemies.length; i<l; i++) {
				if (enemies[i].enemy().meta.book !== 'no') {
					this._list.push(enemies[i]);
				}
			}
				// v1.17
		} else if (!this.isAllEnemies) {
			var enemyIds = [];
			var enemies = $gameTroop.aliveMembers();
			for (var i=0,l=enemies.length; i<l; i++) {
				var id = enemies[i].enemyId();
				var flag = enemyIds.some(function(id2) {
					return id === id2;
				});
				if (enemies[i].enemy().meta.book !== 'no' && !flag) {
					enemyIds.push(id);
					var gameEnemy = new Game_Enemy(id,0,0);
					this._list.push(gameEnemy);
				}
			}
		} else {
			for (var i = 1; i < $dataEnemies.length; i++) {
				var enemy = $dataEnemies[i];
				if (enemy.name && enemy.meta.book !== 'no') {
					var gameEnemy = new Game_Enemy(i,0,0);
					this._list.push(gameEnemy);
				}
			}
		}
		this.createContents();
		this.drawAllItems();
	};

	Window_EnemyBookIndex.prototype.drawItem = function(index) {
		var enemy = this._list[index];
		var rect = this.itemRectForText(index);
		var name;
		// ここは、名前を？にするか判定しているだけなので変えない
		// v1.18　（↑は間違ってた）
		if (!this.isAllEnemies || $gameSystem.isInEnemyBook(enemy.enemy())) {
			name = enemy.name();
		} else {
			name = UnknownEnemy;
		}
				// v1.17
		if (this.isAllEnemies && DispNo) {
			this.drawText(index+1, rect.x, rect.y, 40);
			this.drawText(name, rect.x + 40, rect.y, rect.width - 40);
		} else {
			this.drawText(name, rect.x, rect.y, rect.width);
		}
	};
/* ツクールMV rpg_windows.jsより
Window_Selectable.processCancelでハンドラが呼ばれている。
Window_Selectable.prototype.processCancel = function() {
    SoundManager.playCancel();
    this.updateInputData();
    this.deactivate();
    this.callCancelHandler();
};
*/
// TODO: 戦闘中に図鑑（全体）を開いた後、チェックスキルを使うと何も表示されない
	Window_EnemyBookIndex.prototype.processCancel = function() {
		// v1.17
		if (this.isAllEnemies) {
			Window_EnemyBookIndex.lastIndex = this.index();
		}
		this.enemy = null;
		this._statusWindow.isCheck = false;
		// v1.17 後ろに移動
		Window_Selectable.prototype.processCancel.call(this);
	};

//=============================================================================
// Window_EnemyBookStatus
//=============================================================================

	Window_EnemyBookStatus = function() {
		this.initialize.apply(this, arguments);
	};

	Window_EnemyBookStatus.prototype = Object.create(Window_Base.prototype);
	Window_EnemyBookStatus.prototype.constructor = Window_EnemyBookStatus;

	Window_EnemyBookStatus.prototype.initialize = function(x, y, width, height) {
		Window_Base.prototype.initialize.call(this, x, y, width, height);
		this._defaultX = x;
		this._enemy = null;
		this._enemySprite = new Sprite();
		this._enemySprite.anchor.x = 0.5;
		this._enemySprite.anchor.y = 0.5;
		this._enemySprite.x = width / 4;
		this._enemySprite.y = width / 4 + this.lineHeight();
		this.addChildToBack(this._enemySprite);
		this.isCheck = false;
		this.refresh();
		// v1.17
		this.isAllEnemies = false;
		// this._cw = 0;
		this._spriteFrameCountAB = 0;
	};

	Window_EnemyBookStatus.prototype.setup = function() {
		this.x = this._defaultX;
		this.show();
		this.open();
	};

	Window_EnemyBookStatus.prototype.setupWhenCheck = function() {
		this.x = Math.floor((Graphics.boxWidth - this.width) / 2);
		this.show();
		this.open();
	};

	Window_EnemyBookStatus.prototype.setEnemy = function(enemy) {
		if (this._enemy !== enemy) {
			this._enemy = enemy;
			this.refresh();
		}
	};

// refresh に移動
// Version 1.11で復活

	Window_EnemyBookStatus.prototype.update = function() {
		Window_Base.prototype.update.call(this);
		// ver 1.11
		if (this._enemySprite.bitmap) {
			var dataEnemy = this._enemy.enemy();
			// version 1.15
			var bitmap = this._enemySprite.bitmap;
			// ver 1.13
			if (Imported.YEP_X_AnimatedSVEnemies) {
				if (this._spriteFrameCountAB % 12 === 0) {
					if (dataEnemy.sideviewBattler[0]) {
						var ary = [0,1,2,1];
						var motionIndex = 0; // 待機モーション
						var pattern = ary[Math.floor(this._spriteFrameCountAB / 12) % 4];
						var cw = bitmap.width / 9;
						var ch = bitmap.height / 6;
						var cx = Math.floor(motionIndex / 6) * 3 + pattern;
						var cy = motionIndex % 6;
						this._enemySprite.setFrame(cx * cw, cy * ch, cw, ch);
						// YEP_X_AnimatedSVEnemiesにはここに Sprite_Enemy.adjustMainBitmapSettingsがある。
						// これはBitmapを新しく作っている。（？）
						// サイドビューバトラーの高さと幅を指定していた場合調整される。
						// this._enemySprite.bitmap = new Bitmap(cw, ch);
					// サイドビューバトラーじゃない場合
					} else {
						// 1回目に表示されるようになったけどはみ出す
						this._enemySprite.setFrame(0,0,bitmap.width, bitmap.height);
						// undefined
						// console.log(this._enemySprite.spriteScaleX);
					}
				}
			}
			//ver 1.12
			if (Imported.YEP_X_AnimatedSVEnemies && dataEnemy.sideviewBattler[0]) {
				var bitmapWidth = bitmap.width / 9;
			} else {
				var bitmapWidth = bitmap.width;
			}
			var contentsWidth = this.contents.width;
			var scale = 1;
			//
			//console.log(this._enemySprite.bitmap.width);
			//console.log(contentsWidth);
			if (bitmapWidth > contentsWidth / 2) {
				scale = contentsWidth / bitmapWidth / 2;
				//console.log("bitmapWidth(+"bitmapWidth"+) > contentsWidth / 2");
			}
			this._enemySprite.scale.x = scale;
			this._enemySprite.scale.y = scale;
			this._spriteFrameCountAB++;
		}
	};

	Window_EnemyBookStatus.prototype.refresh = function() {
		var enemy = this._enemy;
		var column1x = 0;
		var column2x = this.contentsWidth() / 2 + this.standardPadding() / 2;
		var columnWidth = this.contentsWidth() / 2 - this.standardPadding();
		var x = 0;
		var y = 0;
		var w = column2x / 2 - this.standardPadding();
		//var mY = 0;
		var lineHeight = this.lineHeight();

		this.contents.clear();

				// v1.17
		if (!enemy || (this.isAllEnemies && !$gameSystem.isInEnemyBook(enemy.enemy()))) {
			this._enemySprite.bitmap = null;
			return;
		}

		
		var isUnknownEnemy = (!$gameSystem.isInEnemyBook(enemy.enemy()) && (!this.isCheck || HideUnknownStatusInSkill));
		var dataEnemy = enemy.enemy();

		var name = enemy.battlerName();
		var hue = enemy.battlerHue();

		var bitmap;
		
		this._enemySprite.scale.x = 1;
		this._enemySprite.scale.y = 1;
		if ($gameSystem.isSideView()) {
			// YEP_X_AnimatedSVEnemiesへの対応（v1.08）
			if (Imported.YEP_X_AnimatedSVEnemies && dataEnemy.sideviewBattler[0]) {
				name = Yanfly.Util.getRandomElement(dataEnemy.sideviewBattler);
				bitmap = ImageManager.loadSvActor(name);
				var motionIndex = 0;
				var pattern = 1;
				var cw = bitmap.width / 9;
				var ch = bitmap.height / 6;
				var cx = Math.floor(motionIndex / 6) * 3 + pattern;
				var cy = motionIndex % 6;
				this._enemySprite.bitmap = bitmap;
				this._enemySprite.setFrame(cx * cw, cy * ch, cw, ch);

			} else {
				bitmap = ImageManager.loadSvEnemy(name, hue);
				var cw = bitmap.width;
				var ch = bitmap.height;
				var cx = 0;
				var cy = 0;
				this._enemySprite.bitmap = bitmap;
				// Ver1.11 たぶんこれが原因で1回目に表示されないので、
				// YEP_X_AnimatedSVEnemiesを使っていないときは
				// 処理をしない
				if (Imported.YEP_X_AnimatedSVEnemies) {
					this._enemySprite.setFrame(cx * cw, cy * ch, cw, ch);
				}
			}
			
		} else {
			bitmap = ImageManager.loadEnemy(name, hue);
			var cw = bitmap.width;
			var ch = bitmap.height;
			var cx = 0;
			var cy = 0;
			this._enemySprite.bitmap = bitmap;
			if (Imported.YEP_X_AnimatedSVEnemies) {
				this._enemySprite.setFrame(cx * cw, cy * ch, cw, ch);
			}
		}
		// Version 1.11
		// version 1.13で削除
		// this._cw = cw;

		// ver 1.12
/*
		var bitmapWidth = this._cw;
		var contentsWidth = this.contents.width;
		var scale = 1;
		if (bitmapWidth > contentsWidth / 2) {
			scale = contentsWidth / bitmapWidth / 2;
		}
		this._enemySprite.scale.x = scale;
		this._enemySprite.scale.y = scale;
		
*/
		this.resetTextColor();
		this.drawText(enemy.name(), x, y, columnWidth);

		x = column2x;

		if (dataEnemy.meta.bookLevel && DispLv) {
			this.resetTextColor();
			this.drawText(TextManager.levelA + " " + dataEnemy.meta.bookLevel, x, y);
		}


		if (DispLv) y += lineHeight;
		if (DispDefeatNumber) {
			this.resetTextColor();
			this.drawText(DefeatNumberName, x, y, w);
			this.drawText($gameSystem.defeatNumber(enemy.enemyId()), x + w, y, w , 'right');
			y += lineHeight;
		}

		if (y != 0) y += this.textPadding();

		for (var i = 0; i < 8; i++) {
			if (dispParameters[i]) {
				// v1.17
				if (i == 0 && !this.isAllEnemies && ($gameSystem.isShowCurrentEnemysStatus() || this.isCheck) && !ShowGeneralStatusInSkill) {
					if (!isUnknownEnemy) {
						this.drawActorHp(enemy, x, y, 220);
					}	else {
						this.changeTextColor(this.systemColor());
						this.drawText(TextManager.hpA, x, y, 60);
						this.resetTextColor();
						this.drawText(UnknownData, x + w, y, w, 'right');
					}
				// v1.17
				} else if (i == 1 && !this.isAllEnemies && ($gameSystem.isShowCurrentEnemysStatus() || this.isCheck) && !ShowGeneralStatusInSkill) {
					if (!isUnknownEnemy) {
						this.drawActorMp(enemy, x, y, 220);
					}	else {
						this.changeTextColor(this.systemColor());
						this.drawText(TextManager.mpA, x, y, 60);
						this.resetTextColor();
						this.drawText(UnknownData, x + w, y, w, 'right');
					}
				} else {
					this.changeTextColor(this.systemColor());
					this.drawText(TextManager.param(i), x, y, w);
					this.resetTextColor();
					if (!isUnknownEnemy) {
						this.drawText(enemy.param(i), x + w, y, w, 'right');
					} else {
						this.drawText(UnknownData, x + w, y, w, 'right');
					}
				}
				y += lineHeight;
			}
		}
/*
		if (DispDefeatNumber) {
			this.resetTextColor();
			this.changeTextColor(this.systemColor());
			this.drawText(DefeatNumberName, x, y, w);
			this.resetTextColor();
			this.drawText($gameSystem.defeatNumber(enemy.enemyId()), x + w, y, w , 'right');
			y += lineHeight;
		}
*/
		//mY = y;

		x = column1x;
		y = lineHeight * 6 + this.textPadding();

		if (DispDropItems) {
			for (var i = 0, l = dataEnemy.dropItems.length; i < l; i++) {
				var di = dataEnemy.dropItems[i];
				if (di.kind > 0) {
					if (!isUnknownEnemy && $gameSystem.getEnemyDropGot(enemy._enemyId, i)) {
						var item = enemy.itemObject(di.kind, di.dataId);
						this.drawItemName(item, x, y, columnWidth);
					} else {
						this.drawIcon(16, x, y);
						this.drawText(UnknownData, x + 32, y);
					}
					y += lineHeight;
				}
			}
		}

		x = 0;
		y = Scene_EnemyBook.prototype.calcParameterHeight();
		//y = (mY > y) ? mY : y;
		var j = 0;

		for (var i = 0; i < 5; i++) {
			if (dispRates[i]) {
				switch(i) {
				case 0:
					this.drawWeakElement(x, y, columnWidth);
					break;
				case 1:
					this.drawResistElement(x, y, columnWidth);
					break;
				case 2:
					this.drawWeakStates(x, y, columnWidth);
					break;
				case 3:
					this.drawResistStates(x, y, columnWidth);
					break;
				case 4:
					this.drawNoEffectStates(x, y, columnWidth);
					break;
				}
				j++;
				if (j % 2 == 1) {
					x = column2x;
				} else {
					x = column1x;
					y += lineHeight * 2 + this.textPadding();
				}
			}
		}
		if (x == column2x) 
			y += lineHeight * 2 + this.textPadding();
		x = 0;
		
		if (!isUnknownEnemy && DispDescribe) {
			this.drawTextEx(dataEnemy.meta.desc1, x, y + lineHeight * 0);
			this.drawTextEx(dataEnemy.meta.desc2, x, y + lineHeight * 1);
		}
	};

	Window_EnemyBookStatus.prototype.findElementIcon = function(elementId) {
		if (UseElementIconInPluginParameter) {
			return ElementIcons[elementId];
		} else {
			var elementName = $dataSystem.elements[elementId];
			if (elementName.match(/\i\[(\d+)\]/i)) {
				return RegExp.$1;
			}
		}
		return 0;
	};

	Window_EnemyBookStatus.prototype.drawResistElement = function(x, y, w) {
		var enemy = this._enemy;
		var elements = $dataSystem.elements;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=elements.length; i < l; i++) {
			var rate = enemy.elementRate(i);
			if (rate < 1) {
				var icon = this.findElementIcon(i);
				if (icon) icons.push(icon);
			}
		}
		
		this.changeTextColor(this.systemColor());
		this.drawText(ResistElementName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};

	Window_EnemyBookStatus.prototype.drawWeakElement = function(x, y, w) {
		var enemy = this._enemy;
		var elements = $dataSystem.elements;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=elements.length; i < l; i++) {
			var rate = enemy.elementRate(i);
			if (rate > 1) {
				var icon = this.findElementIcon(i);
				if (icon) icons.push(icon);
			}
		}
		
		this.changeTextColor(this.systemColor());
		this.drawText(WeakElementName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};

	Window_EnemyBookStatus.prototype.drawResistStates = function(x, y, w) {
		var enemy = this._enemy;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=$dataStates.length; i<l; i++) {
			var rate = enemy.stateRate(i);
			if ((rate < 1 || enemy.isStateResist(i))&& $dataStates[i].meta.book !== "no") {
				if (dispRates[4] && (rate <= 0 || enemy.isStateResist(i))) continue;
				var icon = $dataStates[i].iconIndex;
				if (icon) icons.push(icon);
			}
		}

		
		this.changeTextColor(this.systemColor());
		this.drawText(ResistStateName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};
	Window_EnemyBookStatus.prototype.drawWeakStates = function(x, y, w) {
		var enemy = this._enemy;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=$dataStates.length; i<l; i++) {
			var rate = enemy.stateRate(i);
			if (rate > 1 && $dataStates[i].meta.book !== "no") {
				var icon = $dataStates[i].iconIndex;
				if (icon) icons.push(icon);
			}
		}

		
		this.changeTextColor(this.systemColor());
		this.drawText(WeakStateName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};

	Window_EnemyBookStatus.prototype.drawNoEffectStates = function(x, y, w) {
		var enemy = this._enemy;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=$dataStates.length; i<l; i++) {
			var rate = enemy.stateRate(i);
			if ((rate <= 0 || enemy.isStateResist(i))&& $dataStates[i].meta.book !== "no") {
				var icon = $dataStates[i].iconIndex;
				if (icon) icons.push(icon);
			}
		}

		
		this.changeTextColor(this.systemColor());
		this.drawText(NoEffectStateName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};
//=============================================================================
// Game_Action
//=============================================================================

	var Game_Action_prototype_apply = Game_Action.prototype.apply;
	Game_Action.prototype.apply = function(target) {
		Game_Action_prototype_apply.call(this, target);
		this.applyEnemyBookEffect(target);
	};

	Game_Action.prototype.applyEnemyBookEffect = function(target) {
		if (target.isEnemy()) {
			if (this._item.object().meta.addToEnemyBook) {
				this.addToEnemyBook(target);
			}
			if (this._item.object().meta.checkEnemyStatus) {
				this.checkEnemyStatus(target);
			}
		}
	};

	Game_Action.prototype.addToEnemyBook = function(target) {
		var result = target.result();
		this.makeSuccess(target);
		if (result.isHit()) {
			if (target.enemy().meta.book !== "no") {
				$gameSystem.addToEnemyBook(target.enemyId());
				var message = AddEnemySkillMessage.replace("%1", target.name());
				if (message) {
					BattleManager._logWindow.push('addText', message);
				}
			} else {
				var message = FailToAddEnemySkillMessage.replace("%1", target.name());
				if (message) {
					BattleManager._logWindow.push('addText', message);
				}
			}
		} else {
			var message = MissToAddEnemySkillMessage.replace("%1", target.name());
			if (message) {
				BattleManager._logWindow.push('addText', message);
			}
		}
	};

	Game_Action.prototype.checkEnemyStatus = function(target) {
		this.makeSuccess(target);
		if (!(target.enemy().meta.book == "no" && !target.enemy().meta.bookCanCheck)) {
			var indexWindow = SceneManager._scene._enemyBookIndexWindow;
			var statusWindow = SceneManager._scene._enemyBookStatusWindow;
			if (ShowGeneralStatusInSkill) {
				var id = target.enemyId();
				indexWindow.enemy = new Game_Enemy(id, 0, 0);
			} else {
				indexWindow.enemy = target;
			}
			statusWindow.isCheck = true;
			// v1.17
			indexWindow.isAllEnemies = false;
			statusWindow.isAllEnemies = false;

			indexWindow.setupWhenCheck();
			statusWindow.setupWhenCheck();
		} else {
			var message = FailToCheckEnemySkillMessage.replace("%1", target.name());
			if (message) {
				BattleManager._logWindow.push('addText', message);
			}
		}
	};


//=============================================================================
// Game_Enemy
//=============================================================================

	var _Game_Enemy_die = Game_Enemy.prototype.die;
	Game_Enemy.prototype.die = function() {
		_Game_Enemy_die.call(this);
		$gameSystem.incrementDefeatNumber(this.enemyId());
	};

	var _Game_Enemy_prototype_makeDropItems = Game_Enemy.prototype.makeDropItems;
	Game_Enemy.prototype.makeDropItems = function() {
		var r = _Game_Enemy_prototype_makeDropItems.call(this);
		for (var i=0, l=r.length; i<l; i++) {
			var DI = this.enemy().dropItems;
			for (var j=0, jl=DI.length; j<jl; j++) {
				if (r[i].id === DI[j].dataId) {
					switch (DI[j].kind) {
					case 1:
						if (DataManager.isItem(r[i])) {
							$gameSystem.setEnemyDropGot(this._enemyId, j, true);
						}
						break;
					case 2:
						if (DataManager.isWeapon(r[i])) {
							$gameSystem.setEnemyDropGot(this._enemyId, j, true);
						}
						break;
					case 3:
						if (DataManager.isArmor(r[i])) {
							$gameSystem.setEnemyDropGot(this._enemyId, j, true);
						}
						break;
					}
				}
			}
		}
		return r;
	}

})();