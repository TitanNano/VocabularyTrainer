using System;
using System.Collections.Generic;
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
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace VocabularyTrainer
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            App.currentProfile = Storage.readXML<Profile>("Profile.xml") ?? new Profile();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            var manager = new WordManager();

            this.Hide();
            manager.ShowDialog();
            this.Show();
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            this.DataContext = App.currentProfile;
        }

        private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            Storage.writeXML<Profile>(App.currentProfile, "Profile.xml");
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            var trainer = new Training();

            this.Hide();
            trainer.ShowDialog();
            this.Show();
        }

        private void Button_Click_2(object sender, RoutedEventArgs e)
        {
            foreach (var word in App.currentProfile.wordList)
            {
                word.tries = 0;
                word.right = 0;
                word.priority = 0;
            }

            App.currentProfile.progress = 0;
        }
    }
}
