using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VocabularyTrainer
{
    public class TestUnit : INotifyPropertyChanged
    {
        public List<Word> wordList { get; set; } 
        public int maxIndex { get; set; }
        public Profile profile { get; set; }

        private TestMode _mode = TestMode.empty;
        private WordTestItem _currentItem;
        private int _currentIndex;



        public TestMode mode
        {
            get
            {
                return _mode;
            }

            set
            {
                _mode = value;

                OnPropertyChanged("mode");
            }
        }

        public WordTestItem currentItem
        {
            get
            {
                return _currentItem;
            }

            set
            {
                _currentItem = value;

                OnPropertyChanged("currentItem");
            }
        }

        public int currentIndex
        {
            get
            {
                return _currentIndex;
            }

            set
            {
                _currentIndex = value;

                OnPropertyChanged("currentIndex");
            }
        }
        
        public const int UNIT_SIZE = 20;


        public TestUnit(Profile profile)
        {
            var sortedList = (from item in profile.wordList
                              orderby item.priority
                              select item).ToList();

            if (sortedList.Count() >= TestUnit.UNIT_SIZE)
            {
                var chunk = new List<Word>();

                for (var i = 0; i < TestUnit.UNIT_SIZE; i++)
                {
                    chunk.Add(sortedList[i]);
                }

                sortedList = chunk;
            }

            this.wordList = sortedList;
            this.profile = profile;
            this.maxIndex = wordList.Count();
        }

        public bool next ()
        {

            if (currentIndex < maxIndex)
            {
                this.currentIndex++;
                this.currentItem = new WordTestItem(this.wordList[this.currentIndex-1], mode);

                return true;
            } else
            {
                return false;
            }
        }

        public void checkWord ()
        {
            currentItem.item.tries++;

            if (currentItem.answer.Equals(currentItem.solution, StringComparison.OrdinalIgnoreCase) || 
                (mode == TestMode.targetLang && currentItem.answer.Equals(currentItem.item.pronounciation, StringComparison.OrdinalIgnoreCase)))
            {
                currentItem.item.priority++;
                currentItem.item.right++;
                currentItem.status = Status.right;
            } else
            {
                currentItem.status = Status.wrong;
            }

            float success = 0;
            float tests = 0;
            float tested = 0;

            foreach (Word word in profile.wordList)
            {
                if (word.tries > 0)
                {
                    success += word.right;
                    tests += word.tries;
                    tested += 1;
                }
            }

            var x = (success / tests) * 100 * (tested / (float)(profile.wordList.Count()));

            profile.progress = (int)Math.Round(x);
            profile.lastTime = DateTime.Now;
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

    public enum TestMode
    {
        empty, userLang, targetLang
    }
}
