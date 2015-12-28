using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VocabularyTrainer
{
    public class WordTestItem : INotifyPropertyChanged
    {
        public string title { get; set; }
        public string answer { get; set; }
        public string solution { get; set; }
        public Word item { get; set; }

        private Status _status = Status.notTested;

        public Status status
        {
            get
            {
                return _status;
            }

            set
            {
                _status = value;

                OnPropertyChanged("status");
            }
        }

        public WordTestItem (Word word, TestMode mode)
        {
            this.title = (mode == TestMode.userLang) ? word.value : word.translation;
            this.solution = (mode == TestMode.userLang) ? word.translation : word.value;
     
            this.item = word;
        }

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

    public enum Status
    {
        notTested, right, wrong
    }
}
