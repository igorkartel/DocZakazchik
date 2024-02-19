from django.db import models


class AboutResource(models.Model):
    title = models.CharField(max_length=250, verbose_name='Название ресурса')  # заголовок Документация Человека
    description = models.TextField(verbose_name='Описание ресурса')  # текст, описывающий видео
    file = models.FileField(upload_to='./video', verbose_name='Видео о ресурсе')  # Видео о ресурсе
    data_add_video = models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления видео')  # Дата добавления видео
    image = models.ImageField(upload_to='./preview_img', verbose_name='Превью-картинка для видео')  # Превью-картинка для видео

    class Meta:
        verbose_name_plural = 'Блок "О ресурсе"'
        verbose_name = 'Блок "О ресурсе"'

    def __str__(self):
        return self.title


class SomeFacts(models.Model):
    description = models.TextField(verbose_name='Определение термина или описание факта')  # определение терминов или перечисление фактов

    class Meta:
        verbose_name_plural = 'Блок "Немного фактов"'
        verbose_name = 'Блок "Немного фактов"'

    def __str__(self):
        return self.description
