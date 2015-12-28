using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace VocabularyTrainer
{
    public class Profile : INotifyPropertyChanged
    {

        public string userLang { set; get; } = "English";
        public string targetLang { set; get; } = "";
        private int _progress;
        private DateTime _lastTime;
        public ObservableCollection<Word> wordList { set; get; } = new ObservableCollection<Word>();

        public int progress
        {
            get
            {
                return _progress;
            }

            set
            {
                _progress = value;

                OnPropertyChanged("progress");
            }
        }

        public DateTime lastTime
        {
            get
            {
                return _lastTime;
            }

            set
            {
                _lastTime = value;

                OnPropertyChanged("lastTime");
            }
        }

        [XmlIgnore]
        public TestUnit test { get; set; }


        public event PropertyChangedEventHandler PropertyChanged;

        private void OnPropertyChanged(string name)
        {
            PropertyChangedEventHandler handler = PropertyChanged;
            if (handler != null)
            {
                handler(this, new PropertyChangedEventArgs(name));
            }
        }
    }
}
