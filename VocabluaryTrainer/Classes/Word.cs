using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VocabularyTrainer
{
    public class Word
    {
        public string value { get; set; }
        public string translation { get; set; }
        public string pronounciation { get; set; }
        public int priority { get; set; }
        public int tries { get; set; }
        public int right { get; set; }
    }
}
