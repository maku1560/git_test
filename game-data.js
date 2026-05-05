window.GAME_DATA = {
  title: '言い訳バトル：信用残高ゼロ',
  subtitle: 'その言い訳、美少女に通りますか？',
  characters: [
    { id: 'rena', name: '白銀 怜奈', role: '上司', description: '信用重視のクール上司。通じる言い訳は少ない。', specialty: '安全' },
    { id: 'mio', name: '日向 ミオ', role: '同僚', description: '空気重視のノリ良き同僚。笑えたら少し許す。', specialty: '半ボケ' },
    { id: 'koharu', name: '淡島 こはる', role: '後輩', description: '誠実さ重視の後輩。雑なごまかしには弱い。', specialty: '安全・半ボケ' }
  ],
  resultComments: {
    rena: { good: '言い訳は多かったですが、最低限の誠意は見えました。次は結果で返してください。', weird_liked: '信用は削れました。ただ、妙な胆力だけは記憶に残りました。', business_survive: '業務上は許容範囲です。人としての評価は、まだ保留します。', danger: '説明を重ねるほど、評価が静かに沈んでいきました。', normal: '今回は見逃します。次に同じ説明は通りません。' },
    mio: { good: 'まあまあ許せるライン。次やったらネタにするからね。', weird_liked: '信用は危ないけど、飲み会の話題としては優秀。', business_survive: '仕事としてはセーフ。でも、おもしろ成分が足りない。', danger: '面白いけど、同じチームには少し怖い。', normal: '怒るほどではないけど、いじる材料は増えた。' },
    koharu: { good: 'ちゃんと向き合ってくれた感じがしました。少し安心しました。', weird_liked: 'よくわからなかったです。でも、なんだか忘れられません。', business_survive: '問題はなさそうです。でも、少しだけ距離を置いて見守ります。', danger: '信じたい気持ちはありました。でも、途中で迷子になりました。', normal: 'たぶん大丈夫です。たぶん、です。' }
  },
  questions: [
    { title: '遅刻した', situation: '始業時間を過ぎて到着。選んだ相手が、静かにこちらを見ています。', cards: [
      { id: 'late_safe', type: 'safe', name: '正直な寝坊', text: 'すみません、寝坊しました。次から対策します。', effects: { trust: -6, anger: 4, laugh: 0, chaos: 0 }, affection: { rena: 7, mio: 2, koharu: 6 }, expression: { rena: 'normal', mio: 'confused', koharu: 'normal' }, reaction: { rena: '正直なのは評価します。次は対策まで先に出してください。', mio: '潔いけど、寝坊は寝坊やな。コーヒー買ってきて。', koharu: '正直に言ってくれたので、少し安心しました。' } },
      { id: 'late_joke', type: 'joke', name: '脳内出社', text: '気持ちは定時に着いていました。体が遅れました。', effects: { trust: -12, anger: 8, laugh: 8, chaos: 3 }, affection: { rena: -4, mio: 10, koharu: 1 }, expression: { rena: 'angry', mio: 'smile', koharu: 'confused' }, reaction: { rena: '気持ちだけでは勤怠に反映されません。', mio: '体が遅刻してるの、もうほぼ全部やん。', koharu: 'えっと……気持ちは受け取りました。' } },
      { id: 'late_chaos', type: 'chaos', name: '時空の乗換ミス', text: '乗る電車を間違えて、少し別の時間軸にいました。', effects: { trust: -22, anger: 14, laugh: 6, chaos: 16 }, affection: { rena: -12, mio: 4, koharu: -5 }, expression: { rena: 'angry', mio: 'confused', koharu: 'confused' }, reaction: { rena: '時間軸より、出社時刻を確認してください。', mio: '別の時間軸でも遅刻してそう。', koharu: 'すごい話ですけど、遅刻は遅刻ですよね……。' } }
    ]},
    { title: 'メール返信を忘れた', situation: '大事なメールに返信していないことが発覚しました。', cards: [
      { id: 'mail_safe', type: 'safe', name: '確認遅れ', text: '確認していたのですが、返信が遅れました。すぐ対応します。', effects: { trust: -5, anger: 3, laugh: 0, chaos: 0 }, affection: { rena: 8, mio: 1, koharu: 7 }, expression: { rena: 'normal', mio: 'normal', koharu: 'smile' }, reaction: { rena: '対応が早ければ、まだ取り戻せます。', mio: 'まあ、それが一番マシなやつやね。', koharu: 'すぐ返してくれるなら、大丈夫だと思います。' } },
      { id: 'mail_joke', type: 'joke', name: '脳内送信済み', text: '返信文を考えすぎて、脳内では送信完了していました。', effects: { trust: -10, anger: 6, laugh: 9, chaos: 3 }, affection: { rena: -2, mio: 11, koharu: 3 }, expression: { rena: 'confused', mio: 'smile', koharu: 'normal' }, reaction: { rena: '脳内ではなく、送信ボタンを押してください。', mio: 'ある。いや、あるけど許されるかは別。', koharu: '考えてくれていたのは、ちょっと伝わりました。' } },
      { id: 'mail_chaos', type: 'chaos', name: 'メール熟成中', text: '返信を寝かせることで、味に深みを出していました。', effects: { trust: -20, anger: 13, laugh: 7, chaos: 14 }, affection: { rena: -11, mio: 5, koharu: -4 }, expression: { rena: 'angry', mio: 'smile', koharu: 'confused' }, reaction: { rena: 'メールはワインではありません。', mio: '熟成させた結果、相手の怒りも深くなってるわ。', koharu: '味より、返信がほしかったです……。' } }
    ]},
    { title: '締切を過ぎた', situation: '提出期限を過ぎた資料について、説明を求められています。', cards: [
      { id: 'deadline_safe', type: 'safe', name: '進捗と謝罪', text: '遅れて申し訳ありません。現在ここまで進んでいます。', effects: { trust: -8, anger: 5, laugh: 0, chaos: 0 }, affection: { rena: 9, mio: 2, koharu: 8 }, expression: { rena: 'normal', mio: 'normal', koharu: 'smile' }, reaction: { rena: '遅延報告としては最低限整っています。次は先に共有してください。', mio: '遅れたけど、状況出せるだけまだ人間。', koharu: '進んでいるなら、少し安心しました。' } },
      { id: 'deadline_joke', type: 'joke', name: '締切との距離感', text: '締切と向き合いすぎて、逆に見失いました。', effects: { trust: -15, anger: 10, laugh: 8, chaos: 5 }, affection: { rena: -6, mio: 9, koharu: -1 }, expression: { rena: 'angry', mio: 'smile', koharu: 'confused' }, reaction: { rena: '見失う前に、共有してください。', mio: '距離感バグってる恋愛相談みたいになってる。', koharu: '向き合っていたなら、もう少し早く言ってほしかったです。' } },
      { id: 'deadline_chaos', type: 'chaos', name: '未来からの提出', text: '未来の自分は完成させています。今、追いついています。', effects: { trust: -25, anger: 16, laugh: 5, chaos: 18 }, affection: { rena: -14, mio: 3, koharu: -8 }, expression: { rena: 'angry', mio: 'confused', koharu: 'confused' }, reaction: { rena: '未来ではなく、今日の提出物を見せてください。', mio: '未来の自分にだけ仕事させるな。', koharu: '未来の話より、今の進捗が知りたいです……。' } }
    ]},
    { title: '会議資料を読んでいない', situation: '会議が始まった直後、資料を読んでいないことに気づきました。', cards: [
      { id: 'meeting_safe', type: 'safe', name: '未読申告', text: 'すみません、読み込み不足です。要点を確認させてください。', effects: { trust: -7, anger: 5, laugh: 0, chaos: 0 }, affection: { rena: 8, mio: 1, koharu: 7 }, expression: { rena: 'normal', mio: 'normal', koharu: 'smile' }, reaction: { rena: '正直に言った点は評価します。会議中に取り戻してください。', mio: 'まあ、黙って知った顔するよりはマシ。', koharu: '確認しようとしてくれるなら、助かります。' } },
      { id: 'meeting_joke', type: 'joke', name: '初見の強み', text: '初見だからこそ、ユーザー目線で参加できます。', effects: { trust: -13, anger: 8, laugh: 9, chaos: 5 }, affection: { rena: -5, mio: 10, koharu: 1 }, expression: { rena: 'angry', mio: 'smile', koharu: 'confused' }, reaction: { rena: 'その言い方で、準備不足は消えません。', mio: 'ものは言いよう選手権なら決勝いける。', koharu: '前向きなのは、少しだけいいと思います。' } },
      { id: 'meeting_chaos', type: 'chaos', name: '白紙の器', text: '何も入っていない分、先入観なく受け止められます。', effects: { trust: -23, anger: 15, laugh: 5, chaos: 17 }, affection: { rena: -13, mio: 2, koharu: -7 }, expression: { rena: 'angry', mio: 'confused', koharu: 'confused' }, reaction: { rena: '白紙なのは資料ではなく、準備状況ですね。', mio: '器はきれいでも、中身が空やん。', koharu: '先入観より、資料の内容がほしいです……。' } }
    ]},
    { title: '飲み会を断りたい', situation: '業務後の飲み会に誘われました。できれば帰りたい空気です。', cards: [
      { id: 'drink_safe', type: 'safe', name: '予定あり', text: '今日は先約があるので、また次回お願いします。', effects: { trust: -2, anger: 1, laugh: 0, chaos: 0 }, affection: { rena: 6, mio: 3, koharu: 6 }, expression: { rena: 'smile', mio: 'normal', koharu: 'smile' }, reaction: { rena: '問題ありません。予定管理ができているなら十分です。', mio: 'まあ、次回って言ったからには次回な。', koharu: 'ちゃんと伝えてくれるなら、大丈夫です。' } },
      { id: 'drink_joke', type: 'joke', name: '肝臓の有給', text: '今日は肝臓に有給を取らせています。', effects: { trust: -6, anger: 2, laugh: 11, chaos: 4 }, affection: { rena: 1, mio: 12, koharu: 5 }, expression: { rena: 'confused', mio: 'smile', koharu: 'smile' }, reaction: { rena: '体調管理としては、言い方以外は正しいです。', mio: '肝臓ホワイト企業化計画、支持するわ。', koharu: '体を大事にするのは、いいことだと思います。' } },
      { id: 'drink_chaos', type: 'chaos', name: '観葉植物会議', text: '家の観葉植物と今後の方針を話し合う予定です。', effects: { trust: -14, anger: 7, laugh: 8, chaos: 15 }, affection: { rena: -7, mio: 7, koharu: 2 }, expression: { rena: 'angry', mio: 'smile', koharu: 'confused' }, reaction: { rena: '植物との会議より、予定ありで十分です。', mio: 'その会議、議事録だけ見たい。', koharu: '植物を大切にしているのは、少し素敵です。' } }
    ]}
  ]
};
