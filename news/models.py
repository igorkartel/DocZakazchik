from django.db import models


class NewsSection(models.Model):
    title = models.CharField(verbose_name='Название секции', max_length=255, unique=True)

    class Meta:
        verbose_name_plural = 'Название секций'
        verbose_name = 'Название секции'
        ordering = ['id']

    def __str__(self):
        return self.title


class News(models.Model):
    news_title = models.CharField(verbose_name='Заголовок', max_length=255)  # Заголовки новости
    news_body = models.CharField(verbose_name='Содержание', max_length=255)  # Сама новость, ее содержание
    news_sections = models.ManyToManyField('NewsSection', related_name='news_section')  # Новостные секции
    news_img = models.ImageField(verbose_name='Картинка для новости',
                                 upload_to='./new/img', blank=True, null=True)  # Картинка для новости
    news_video = models.FileField(verbose_name='Видео для новости',
                                  upload_to='./new/vedeo', blank=True, null=True)  # Видео для новости
    cover_img = models.ImageField(verbose_name='Картинка, покрывающая видео',
                                  upload_to='./new/vedeo/img', blank=True, null=True)  # Картинка, покрывающая видео
    date_published = models.DateTimeField(verbose_name='Дата публикации новости',
                                          auto_now_add=True)  # Дата публикации новости

    class Meta:
        verbose_name_plural = 'Новости'
        verbose_name = 'Новость'
        ordering = ['-date_published']

    def __str__(self):
        return self.news_title
