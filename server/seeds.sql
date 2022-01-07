INSERT INTO "users" (username, user_type, password) VALUES ('admin', 1, 'admin');
INSERT INTO "users" (username, user_type, password) VALUES ('lothlorien', 2, 'lothlorien');
INSERT INTO "users" (username, user_type, password) VALUES ('timmy', 2, 'timmy');

INSERT INTO "authors" (name) VALUES ('J. K. Rowling');
INSERT INTO "authors" (name) VALUES ('J. R. R. Tolkien');
INSERT INTO "authors" (name) VALUES ('Ahmet Ümit');
INSERT INTO "authors" (name) VALUES ('George R. R. Martin');

INSERT INTO "books" (title, author_id, summary, image_name, year)
    VALUES ('Harry Potter ve Felsefe Taşı', 1, 'Harry, elleri titreyerek zarfı çevirince mor balmumundan bir mühür gördü; bir arma  koca bir ‘H’ harfinin çevresinde bir aslan, bir kartal, bir porsuk, bir de yılan.*Harry Potter sıradan bir çocuk olduğunu sanırken, bir baykuşun getirdiği mektupla yaşamı değişir: Başvurmadığı halde Hogwarts Cadılık ve Büyücülük Okulu’na kabul edilmiştir. Burada birbirinden ilginç dersler alır, iki arkadaşıyla birlikte maceradan maceraya koşar. Yaşayarak öğrendikleri sayesinde küçük yaşta becerikli bir büyücü olup çıkar.', 'felsefe_tasi.jpeg', 1997);

INSERT INTO "books" (title, author_id, summary, image_name, year)
    VALUES ('Harry Potter ve Sırlar Odası', 1, 'Bir komplo var, Harry Potter. Bu yıl Hogwarts Cadılık ve Büyücülük Okulu’nda dehşet verici şeyler yapmak için bir komplo.', 'sirlar_odasi.jpeg', 1998);

INSERT INTO "books" (title, author_id, summary, image_name, year)
    VALUES ('Harry Potter ve Azkaban Tutsağı', 1, 'Sirius Black adında azılı bir katil, tüyler ürpertici Azkaban kalesinde tam on iki yıl boyunca tutsak kalmıştır. Tek lanetle on üç kişiyi birden öldüren Black’in, Karanlık Lord Voldemort’un hizmetkârı olduğuna kesin gözüyle bakılmaktadır. Bir yolunu bulup Azkaban’dan kaçan Black’in peşinde olduğu bir tek kişi vardır: Harry Potter. Harry, büyücülük okulunun sihirli duvarları arasındayken, arkadaşları ve öğretmenleriyle birlikteyken bile güvende değildir. Çünkü aralarında bir hain olabilir.', 'azkaban_tutsagi.jpeg', 1999);

INSERT INTO "books" (title, author_id, summary, image_name, year)
    VALUES ('Harry Potter ve Ateş Kadehi', 1, 'Harry Potter dizisinin dördüncü kitabı Harry Potter ve Ateş Kadehi, Hogwarts Cadılık ve Büyücülük Okulu''nda dördüncü sınıfa geçen Harry''nin başından geçenleri konu alıyor.

Yaz tatilinde yanlarında kaldığı Dursley''lerden bir an önce kurtulmak isteyen Harry, bir yolunu bulup arkadaşlarıyla birlikte Quidditch Dünya Kupası finalini izlemeye gidiyor. Bu yıl okuldaki en büyük yenilik ise Üçbüyücü Turnuvası. Hogwarts''ın yanı sıra iki rakip büyücülük okulunun katılımıyla gerçekleşen bu etkinlik, yüz yıldan beri ilk kez düzenleniyor.

Büyücülük dünyasında her şey her zaman olduğu gibi heyecanla, sürükleyici ve şaşırtıcı. Ancak Harry''nin alnındaki yara izinin ikide bir acıması, korkunç bir olayın yaklaşmakta olduğunun habercisi.', 'ates_kadehi.jpeg', 2000);

INSERT INTO "books" (title, author_id, summary, image_name, year)
    VALUES ('Yüzüklerin Efendisi Birinci Kısım Yüzük Kardeşliği', 2, 'Yüzüklerin Efendisi` son yüzyılın en çok okunan yüz kitabı arasında en başta geliyor; bilimkurgu, fantezi, polisiye, best-seller ya da ana akım demeden, tüm edebiyat türleri arasında tartışmasız bir önderliğe sahip. Bir açıdan bakarsanız bir fantezi romanı, başka bir açıdan baktığınızda, insanlık durumu, sorumluluk, iktidar ve savaş üzerine bir roman. Bir yolculuk, bir büyüme öyküsü; fedakârlık ve dostluk üzerine, hırs ve ihanet üzerine bir roman.', 'yuzuk_kardesligi.jpeg', 1954);

INSERT INTO "books" (title, author_id, summary, image_name, year)
    VALUES ('Hobbit', 2, 'İngiliz Dilbilim Profesörü ve roman yazarı J.R.R. Tolkien’ın olağanüstü bir titizlikle kurguladığı Orta-Dünya adlı fantastik/mitolojik bir evrende geçen Hobbit, yazarın bu evrende geçen masalları çocuklarına anlatmaya başlamasıyla bir kitap haline gelmiştir.


Hobbit adlı eserin üzerine kurulduğu Orta-Dünya büyülü, çeşitli ırklara ve dillere sahip epik bir dünyadır. Bu dünyada İnsanlar, Cüceler, Elfler, Büyücüler, Ejderhalar, Goblinler ve Orklar yaşamaktadır. Cüceler, dağların kalbinde yaşayan kudretli, madenci bir halktır. Korkunç ve altına susamış şeytanî ejderha Smaug, Erebor adlı Cüce Kenti’ne saldırır ve burada yaşayan Cüce halkın başına korkunç felaketler getirir.

Anavatanlarından kaçıp sürgün hayatı yaşamak zorunda kalan Erebor Tahtı’nın Varisi Thorin Meşekalkan ve kuzenleri, Gandalf adında bir büyücünün yardımıyla anavatanlarını ejderha Smaug’dan kurtarmak için olağanüstü bir plan yaparlar. Bu planda oynayacağı rol son derece önemli bir hal alacak Hobbit Bilbo Baggins’in kapısını çalarlar ve Bilbo, hiç beklemediği bir anda, destansı bir maceraya dahil olmak zorunda kalır.


Peter Jackson tarafından üçleme olarak sinemaya uyarlanan eser, yayımlandığı tarihte büyük bir ilgi görmüştür ve olumlu yorumlar alarak çok kısa zamanda kült eser mertebesine erişmiştir.


Hobbit, edebiyat çevrelerince büyük saygı gören Yüzüklerin Efendisi üçlemesinin başlangıcını anlatmasıyla da önemli bir yere sahiptir.', 'hobbit.jpeg', 1937);

INSERT INTO "books" (title, author_id, summary, image_name, year)
    VALUES ('Yüzüklerin Efendisi İki Kule', 2, 'Dünya ikiye bölünmüştür, denir Tolkien’ın yapıtı söz konusu olduğunda: Yüzüklerin Efendisi’ni okumuş olanlar ve okuyacak olanlar: Artık Türkiyeli okur da okumuş olanlar tarafına geçebilecek! "Yüzüklerin Efendisi" son yüzyılın en çok okunan yüz kitabı arasında en başta geliyor; bilimkurgu, fantezi, polisiye, best-seller ya da ana akım demeden, tüm edebiyat türleri arasında tartışmasız bir önderliğe sahip. Bir açıdan bakarsanız bir fantezi romanı, başka bir açıdan baktığınızda, insanlık durumu, sorumluluk, iktidar ve savaş üzerine bir roman. Bir yolculuk, bir büyüme öyküsü; fedakarlık ve dostluk üzerine, hırs ve ihanet üzerine bir roman. Bu ciltte Yüzük kardeşliği dağılıyor. Frodo ve Sam Yüzük’le birlikte Mordor’un kapılarından geçmeye çalışırken yeni bir yol arkadaşı ediniyorlar. Orklara esir düşen Merry ve Pippin, Orta Dünya’nın en eski ırkıyla tanışıyorlar. Aragorn, Gimli ve Legolas ise, Orta Dünya’nın kaderini çizecek büyük savaşların ilkine katılıyorlar...', 'iki_kule.jpeg', 1954);

INSERT INTO "books" (title, author_id, summary, image_name, year)
    VALUES ('Kayıp Tanrılar Ülkesi', 3, 'Ahmet Ümit’ten polisiyeyi arkeoloji ve mitolojiyle harmanlayan usta işi bir roman. Berlin Emniyet Müdürlüğü’nün cevval başkomiseri Yıldız Karasu ve yardımcısı Tobias Becker, göçmenlerin, işgal evlerinin ve sokak sanatçılarının renklendirdiği Berlin sokaklarından Bergama’ya uzanan bir macerada, hayatı ve insanları yok etmeye muktedir sırların peşinde bir seri cinayetler dizisini çözmeye çalışıyor. Soruşturmanın Türkiye ayağında sürpriz bir ismin olaya dahil olmasıyla heyecanın dozu gitgide artıyor. Kayıp Tanrılar Ülkesi, Zeus Altarı ve Pergamon Tapınağı’nın gölgesinde mitlere günümüzde yeniden hayat verirken, suçun çağlar ve kültürler boyu değişmeyen doğasını bir tokat gibi yüzümüze çarpıyor. *O yüzden unuttuk dediğiniz yerden başlayacağım. Unutmanın bedelini ödeyecek unutanlar. Cezaların en şiddetlisiyle ödüllendirilecek saygısızlık yapanlar, kalbi yerinden çıkarılacak beni kalbinden çıkaranların, yüzlerinin derisi yüzülecek benden yüz çevirenlerin…', 'kayip_tanrilar_ulkesi.jpeg', 2021);

INSERT INTO "books" (title, author_id, summary, image_name, year)
    VALUES ('Taht Oyunları', 4, 'Fantastik edebiyatın gelmiş geçmiş en güçlü kalemlerinden George R. R. Martin, müthiş zekasını ortaya koyduğu Taht Oyunları ile dünyaya eşsiz bir miras bırakıyor. İlk yayımlandığı 1996 yılından bu yana tüm dünyada en çok okunan fantastik roman türüne giren eser, okuyucuları ejderhalar devrinin yaşandığı fantastik bir dünyada yolculuğa çıkarıyor. Güç, iktidar, hırs, aşk ve ihaneti doruklarında hissettiren roman serisi, bu kitapta 1’inci ve 2’nci kısımları ile birlikte yer alıyor.

Gerçekçi karakterleri ve sürükleyici olay örgüsü ile elinizden bırakamayacağınız Taht Oyunları, tarihi ve masalsı anlatımı eşsiz bir kurguyla bir araya getiriyor. Siz de iktidar savaşlarının ortasında nefes kesici bir deneyime hazırsanız, Taht Oyunları’nın büyüleyici atmosferine kendinizi bırakmanın tam vakti!', 'game_of_thrones.jpeg', 1996);


INSERT INTO "user_plan_to_read" (user_id, book_id) VALUES (1, 1);
INSERT INTO "user_plan_to_read" (user_id, book_id) VALUES (2, 2);
INSERT INTO "user_plan_to_read" (user_id, book_id) VALUES (1, 2);

INSERT INTO "user_read_books" (user_id, book_id, rating) VALUES (1, 3, 7);
INSERT INTO "user_read_books" (user_id, book_id, rating) VALUES (2, 3, 5);