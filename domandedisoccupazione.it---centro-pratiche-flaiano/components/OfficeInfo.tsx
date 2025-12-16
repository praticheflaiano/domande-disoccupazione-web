import React, { useEffect } from 'react';
import { MapPin, Phone, Clock, CheckCircle2, Building2, FileText, Banknote, ArrowRight, Star } from 'lucide-react';

const ServiceCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 mb-4">
      {icon}
    </div>
    <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
    <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

const ReviewCard = ({ name, text, date }: { name: string, text: string, date: string }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600 text-sm">
        {name.charAt(0)}
      </div>
      <div>
        <div className="font-bold text-slate-900 text-sm">{name}</div>
        <div className="text-xs text-slate-500">{date}</div>
      </div>
      <div className="ml-auto flex">
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5 opacity-60" />
      </div>
    </div>
    <div className="flex text-yellow-400 mb-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="w-4 h-4 fill-current" />
      ))}
    </div>
    <p className="text-slate-600 text-sm leading-relaxed">"{text}"</p>
  </div>
);

const OfficeInfo: React.FC = () => {
  
  useEffect(() => {
    // Caricamento script per il widget di prenotazione (Check for duplicate)
    const scriptUrl = "https://link.arcanis.it/js/form_embed.js";
    let script = document.querySelector(`script[src="${scriptUrl}"]`) as HTMLScriptElement;
    
    if (!script) {
        script = document.createElement('script');
        script.src = scriptUrl;
        script.type = "text/javascript";
        script.async = true;
        document.body.appendChild(script);
    }

    // No cleanup needed as script should persist
  }, []);

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      {/* React 19 Metadata */}
      <title>Chi Siamo e Contatti | Centro Pratiche Flaiano Roma</title>
      <meta name="description" content="Vieni a trovarci al Centro Pratiche Flaiano in Via Filoteo Alberini 25, Roma. Prenota un appuntamento per la tua consulenza fiscale e previdenziale." />

      {/* Hero Ufficio */}
      <div className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 font-serif tracking-tight">Centro Pratiche Flaiano</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Dal cuore di Roma, semplifichiamo la burocrazia per cittadini e famiglie. 
                Assistenza fiscale, previdenziale e legale con un volto umano.
            </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-600 flex items-start gap-4">
                <MapPin className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                    <h3 className="font-bold text-slate-900">Dove Siamo</h3>
                    <p className="text-slate-600 text-sm mt-1">Via Filoteo Alberini, 25/int 10<br/>00139 Roma (RM)</p>
                    <a href="https://maps.google.com/?q=Via+Filoteo+Alberini+25+Roma" target="_blank" rel="noreferrer" className="text-blue-600 text-xs font-bold mt-2 inline-flex items-center hover:underline">
                        Apri Mappa <ArrowRight className="w-3 h-3 ml-1" />
                    </a>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-600 flex items-start gap-4">
                <Phone className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                    <h3 className="font-bold text-slate-900">Contattaci</h3>
                    <p className="text-slate-600 text-sm mt-1">Tel: 06 9784 5429</p>
                    <p className="text-slate-600 text-sm">WhatsApp: 371 623 0690</p>
                    <p className="text-slate-600 text-sm">Email: info@praticheflaiano.it</p>
                    <p className="text-slate-500 text-xs mt-2">Rispondiamo in orario d'ufficio</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-600 flex items-start gap-4">
                <Clock className="w-8 h-8 text-purple-600 flex-shrink-0" />
                <div>
                    <h3 className="font-bold text-slate-900">Orari Apertura</h3>
                    <div className="text-sm text-slate-600 mt-2 space-y-3">
                        <div>
                            <span className="block font-semibold text-slate-800 text-xs uppercase tracking-wide">Lun - Gio:</span>
                            <span>9:30 - 13:00 / 15:30 - 18:00</span>
                        </div>
                        <div>
                            <span className="block font-semibold text-slate-800 text-xs uppercase tracking-wide">Venerdì:</span>
                            <span>9:30 - 14:00 (Orario continuato)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Sezione Servizi Estesa */}
      <div className="max-w-6xl mx-auto px-4 mt-16">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Non solo NASpI</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
                Il Centro Pratiche Flaiano offre una gamma completa di servizi CAF e Patronato per gestire ogni aspetto della tua vita fiscale e previdenziale.
            </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard 
                icon={<Building2 className="w-6 h-6" />}
                title="CAF & Fiscale"
                desc="Elaborazione Modello 730, Modello Redditi, Calcolo IMU, Visti di conformità e gestione cartelle esattoriali."
            />
            <ServiceCard 
                icon={<FileText className="w-6 h-6" />}
                title="ISEE & Bonus"
                desc="Compilazione DSU per ISEE ordinario, corrente e universitario. Richiesta Assegno Unico Universale e Bonus sociali."
            />
            <ServiceCard 
                icon={<CheckCircle2 className="w-6 h-6" />}
                title="Patronato & Pensioni"
                desc="Domande di pensione (vecchiaia, anticipata, reversibilità), invalidità civile, legge 104 e accompagnamento."
            />
            <ServiceCard 
                icon={<Banknote className="w-6 h-6" />}
                title="Disoccupazione"
                desc="Gestione completa NASpI, DIS-COLL, Disoccupazione agricola. Supporto per dimissioni telematiche e risoluzioni consensuali."
            />
             <ServiceCard 
                icon={<Building2 className="w-6 h-6" />}
                title="Contratti Locazione"
                desc="Stesura e registrazione contratti di affitto, cedolare secca, rinnovi e risoluzioni presso l'Agenzia delle Entrate."
            />
             <ServiceCard 
                icon={<CheckCircle2 className="w-6 h-6" />}
                title="Colf & Badanti"
                desc="Gestione completa del rapporto di lavoro domestico: assunzione, buste paga mensili, calcolo TFR e contributi INPS."
            />
        </div>
      </div>

      {/* Sezione Recensioni Google */}
      <div className="bg-slate-50 border-y border-slate-200 mt-16 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-yellow-500 font-bold text-2xl">4.9</span>
              <div className="flex text-yellow-400">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Dicono di noi</h2>
            <p className="text-slate-600">Le recensioni verificate dei nostri clienti su Google</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <ReviewCard 
              name="Valerio C." 
              date="2 mesi fa"
              text="Personale qualificato e molto gentile. Mi hanno seguito per la naspi passo dopo passo spiegandomi tutto con pazienza. Pratica accettata senza intoppi. Consigliatissimo."
            />
            <ReviewCard 
              name="Francesca L." 
              date="1 mese fa"
              text="Veloci, pratici e risolutivi. Hanno gestito la mia pratica di maternità e successiva disoccupazione in modo impeccabile. Finalmente un ufficio dove ti senti ascoltata."
            />
            <ReviewCard 
              name="Alessandro M." 
              date="3 settimane fa"
              text="Ho fatto il 730 e l'ISEE con loro. Organizzati benissimo, appuntamento puntuale e zero file. Ragazzi giovani ma molto preparati. Bravi!"
            />
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="https://www.google.com/maps" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center text-blue-600 font-semibold hover:underline"
            >
              Leggi tutte le recensioni su Google Maps <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Mappa / Location Section */}
      <div className="py-16">
          <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-start gap-12">
              <div className="flex-1 lg:sticky lg:top-24">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Prenota un appuntamento</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                      Per evitare attese e ricevere un servizio dedicato, ti consigliamo di prenotare il tuo appuntamento. 
                      Utilizza il modulo qui a fianco per scegliere data e ora, oppure visita il nostro sito principale per maggiori informazioni.
                  </p>
                  <ul className="space-y-3 mb-8">
                      <li className="flex items-center gap-2 text-slate-700">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <span>Parcheggio disponibile in zona</span>
                      </li>
                      <li className="flex items-center gap-2 text-slate-700">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <span>Accessibile ai disabili</span>
                      </li>
                      <li className="flex items-center gap-2 text-slate-700">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <span>Consulenza su appuntamento per evitare attese</span>
                      </li>
                  </ul>
                  <a 
                    href="https://praticheflaiano.it" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors inline-block text-center"
                  >
                      Vai al sito ufficiale
                  </a>
              </div>
              <div className="flex-1 w-full bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 min-h-[600px] relative">
                    <iframe 
                        src="https://link.arcanis.it/widget/group/bklXY9sZUszt8V2GpkU1" 
                        style={{width: '100%', border: 'none', overflow: 'hidden', minHeight: '600px'}} 
                        scrolling="no" 
                        id="bklXY9sZUszt8V2GpkU1_1764775911716"
                        title="Prenotazioni Centro Pratiche Flaiano"
                    ></iframe>
              </div>
          </div>
      </div>
    </div>
  );
};

export default OfficeInfo;