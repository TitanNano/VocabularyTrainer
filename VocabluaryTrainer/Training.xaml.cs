using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace VocabularyTrainer
{
    /// <summary>
    /// Interaction logic for Training.xaml
    /// </summary>
    public partial class Training : Window
    {
        public TestUnit test { get; set; }

        public Training()
        {
            InitializeComponent();

            test = new TestUnit(App.currentProfile);

            App.currentProfile.test = test;

            sp_select_mode.DataContext = App.currentProfile;
        }

        private void btn_targetLang_Click(object sender, RoutedEventArgs e)
        {
            test.mode = TestMode.targetLang;
            test.next();
        }

        private void btn_userLang_Click(object sender, RoutedEventArgs e)
        {
            test.mode = TestMode.userLang;
            test.next();
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            this.DataContext = this.test;
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            test.checkWord();
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            if (!test.next())
            {
                this.Close();
            } 
        }
    }
}
