using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;

namespace VocabularyTrainer
{
    class Storage
    {
        public static void writeBinary<T>(string file, T source)
        {
            FileStream fs = null;
            try
            {
                BinaryFormatter bf = new BinaryFormatter();
                fs = new FileStream(file, FileMode.Create);
                bf.Serialize(fs, source);
                fs.Close();
            }
            catch (Exception)
            {
                if(fs!=null)
                    fs.Close();
            }
        }

        internal static T readBinary<T>(string file)
        {

            T output;
            BinaryFormatter bf = new BinaryFormatter();

            try
            {
                FileStream fs = new FileStream(file, FileMode.OpenOrCreate);
                output = (T)bf.Deserialize(fs);
                fs.Close();
            }
            catch (Exception)
            {
                    
                output = default(T);
            }
            return output;
        }
        
        public static void writeXML<T>(T data, string fileName)
        {
            XmlSerializer writer = new XmlSerializer(typeof(T));
            FileStream handler;

            handler = new FileStream(fileName, FileMode.Create);
            writer.Serialize(handler, data);

            handler.Close();
        }        

        public static Type readXML<Type>(string fileName)
        {
            try
            {
                using(var handler = new StreamReader(fileName))
                {
                    var reader = new XmlSerializer(typeof(Type));

                    return (Type) reader.Deserialize(handler);
                }

            }
            catch (Exception e)
            {
                return default(Type);
            }
        }
    }
}