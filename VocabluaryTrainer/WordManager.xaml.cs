using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
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
    /// Interaction logic for WordManager.xaml
    /// </summary>
    public partial class WordManager : Window
    {
        public WordManager()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            this.DataContext = App.currentProfile;
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            App.currentProfile.wordList.Add(new Word());

            lb_wordList.SelectedIndex = App.currentProfile.wordList.Count() - 1;
        }

        private void TextBox_PreviewTextInput(object sender, TextCompositionEventArgs e)
        {
            Regex regex = new Regex("[^0-9.-]+"); //regex that matches disallowed text
            e.Handled = regex.IsMatch(e.Text);
        }

        private void Button_Click_2(object sender, RoutedEventArgs e)
        {
            if (lb_wordList.SelectedItem != null)
            {
                App.currentProfile.wordList.Remove((Word)lb_wordList.SelectedItem);
            }
        }
    }
}
